variable "BUCKET_NAME" {
  type        = string
  description = "snapsalary frontend"
  default     = "snapsalary.com"
}

variable "BUCKET_DOMAIN" {
  type        = string
  description = "Regional bucket domain name"
}

variable "CERT_ARN" {
  type        = string
  description = "ARN for the domain certificate"
}
