resource "aws_cloudfront_origin_access_identity" "staging" {
  comment = "Origin Access ID for Production"
}

locals {
  s3_origin_id = "S3Frontend-staging"
}

resource "aws_cloudfront_distribution" "frontend-staging" {
  origin {
    domain_name = aws_s3_bucket.frontend-staging.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.staging.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Staging frontend for SnapSalary"
  default_root_object = "index.html"

  aliases = [aws_s3_bucket.frontend-staging.bucket, var.AWS_S3_BUCKET_STAGING]
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }
  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA"]
    }
  }
  tags = {
    Environment = "staging"
  }
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.staging.certificate_arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }
}
