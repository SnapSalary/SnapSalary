resource "aws_route53_zone" "staging" {
  name = var.AWS_S3_BUCKET_STAGING
}

resource "aws_route53_record" "a" {
  zone_id = aws_route53_zone.staging.zone_id
  name    = var.AWS_S3_BUCKET_STAGING
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend-staging.domain_name
    zone_id                = aws_cloudfront_distribution.frontend-staging.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "aaaa" {
  zone_id = aws_route53_zone.staging.zone_id
  name    = var.AWS_S3_BUCKET_STAGING
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.frontend-staging.domain_name
    zone_id                = aws_cloudfront_distribution.frontend-staging.hosted_zone_id
    evaluate_target_health = false
  }
}
