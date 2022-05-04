resource "aws_cloudfront_origin_access_identity" "prod" {
  comment = "Origin Access ID for Production"
}

locals {
  s3_origin_id = "S3Frontend"
}

resource "aws_cloudfront_distribution" "frontend" {
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.prod.cloudfront_access_identity_path
    }
  }

  enabled = true
  is_ipv6_enabled = true
  comment = "Production frontend for SnapSalary"
  default_root_object = "index.html"

  aliases = [aws_s3_bucket.frontend.bucket, aws_s3_bucket.frontend_root.bucket]
  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "redirect-to-https"
    min_ttl = 0
    default_ttl = 3600
    max_ttl = 86400
  }
  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations = ["US", "CA"]
    }
  }
  tags = {
    Environment = "production"
  }
  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:605557326547:certificate/e82fd265-83e3-4375-a37c-6c15b2bebe97"
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method = "sni-only"
  }
}
