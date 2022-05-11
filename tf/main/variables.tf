variable "AWS_S3_BUCKET" {
  type        = string
  description = "snapsalary frontend"
  default     = "snapsalary.com"
}

variable "mime_types" {
  default = {
    htm  = "text/html"
    html = "text/html"
    css  = "text/css"
    ttf  = "font/ttf"
    js   = "application/javascript"
    map  = "application/javascript"
    json = "application/json"
    txt  = "text/plain"
    ico  = "image/x-icon"
    svg  = "image/svg+xml"
    map  = "application/json"
    jpg  = "image/jpeg"
    jpeg = "image/jpeg"
    png  = "image/png"
  }
}
