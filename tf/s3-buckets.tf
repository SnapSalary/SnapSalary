resource "aws_s3_bucket" "frontend" {
  bucket = "www.${var.AWS_S3_BUCKET}"
}

resource "aws_s3_bucket" "frontend_root" {
  bucket = var.AWS_S3_BUCKET
}

resource "aws_s3_bucket_public_access_block" "block_frontend" {
  bucket              = aws_s3_bucket.frontend.bucket
  block_public_acls   = true
  block_public_policy = true
}

resource "aws_s3_bucket_acl" "frontend-acl" {
  bucket = aws_s3_bucket.frontend.bucket
  acl    = "private"
}

resource "aws_s3_bucket_policy" "frontend_policy" {
  bucket = aws_s3_bucket.frontend.bucket
  policy = data.aws_iam_policy_document.iam_policy.json
}

data "aws_iam_policy_document" "iam_policy" {
  statement {
    sid     = "1"
    actions = ["S3:GetObject"]
    resources = [
      "arn:aws:s3:::www.${var.AWS_S3_BUCKET}/*",
    ]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.prod.iam_arn]
    }
  }
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.bucket
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_object" "frontend" {
  for_each     = fileset("../build/", "**/*.*")
  bucket       = aws_s3_bucket.frontend.bucket
  key          = each.value
  source       = "../build/${each.value}"
  etag         = filemd5("../build/${each.value}")
  content_type = lookup(var.mime_types, split(".", each.value)[length(split(".", each.value)) - 1])
}
