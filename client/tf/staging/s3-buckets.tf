resource "aws_s3_bucket" "frontend-staging" {
  bucket = "${var.AWS_S3_BUCKET_STAGING}"
}

resource "aws_s3_bucket_public_access_block" "block_frontend" {
  bucket              = aws_s3_bucket.frontend-staging.bucket
  block_public_acls   = true
  block_public_policy = true
}

resource "aws_s3_bucket_acl" "frontend-acl" {
  bucket = aws_s3_bucket.frontend-staging.bucket
  acl    = "private"
}

resource "aws_s3_bucket_policy" "frontend_policy" {
  bucket = aws_s3_bucket.frontend-staging.bucket
  policy = data.aws_iam_policy_document.iam_policy.json
}

data "aws_iam_policy_document" "iam_policy" {
  statement {
    sid     = "1"
    actions = ["S3:GetObject"]
    resources = [
      "arn:aws:s3:::${aws_s3_bucket.frontend-staging.bucket}/*",
    ]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.staging.iam_arn]
    }
  }
}

resource "aws_s3_bucket_website_configuration" "frontend-staging" {
  bucket = aws_s3_bucket.frontend-staging.bucket
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_object" "frontend" {
  for_each     = fileset("../build/", "**/*.*")
  bucket       = aws_s3_bucket.frontend-staging.bucket
  key          = each.value
  source       = "../build/${each.value}"
  etag         = filemd5("../build/${each.value}")
  content_type = lookup(var.mime_types, split(".", each.value)[length(split(".", each.value)) - 1])
}
