resource "aws_s3_bucket" "frontend" {
  bucket = var.AWS_S3_BUCKET
}

resource "aws_s3_bucket_acl" "bucket-acl" {
  bucket = aws_s3_bucket.frontend.bucket
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.frontend.bucket
  policy = data.aws_iam_policy_document.iam_policy.json
}

data "aws_iam_policy_document" "iam_policy" {
  statement {
    sid    = "AllowPublicRead"
    effect = "Allow"

    resources = [
      "arn:aws:s3:::${var.AWS_S3_BUCKET}/*",
    ]

    actions = ["S3:GetObject"]

    principals {
      type        = "*"
      identifiers = ["*"]
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
  for_each = fileset("../build/", "**/*.*")
  bucket = aws_s3_bucket.frontend.bucket
  key = each.value
  source = "../build/${each.value}"
  etag = filemd5("../build/${each.value}")
  content_type = lookup(var.mime_types, split(".", each.value)[length(split(".", each.value)) -1])
}
