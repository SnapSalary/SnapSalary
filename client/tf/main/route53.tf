resource "aws_route53_zone" "prod" {
  name = "snapsalary.com"
}

resource "aws_route53_record" "a" {
  zone_id = aws_route53_zone.prod.zone_id
  name    = var.AWS_S3_BUCKET
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "aaaa" {
  zone_id = aws_route53_zone.prod.zone_id
  name    = var.AWS_S3_BUCKET
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "a-www" {
  zone_id = aws_route53_zone.prod.zone_id
  name    = "www.${var.AWS_S3_BUCKET}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "aaaa-www" {
  zone_id = aws_route53_zone.prod.zone_id
  name    = "www.${var.AWS_S3_BUCKET}"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}
