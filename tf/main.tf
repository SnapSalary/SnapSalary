terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = "snapsalary-frontend"
  index_document {
    suffix = "index.html"
  }
}
