resource "aws_secretsmanager_secret" "rds_info" {
  name = "RDS_SECRET"
  recovery_window_in_days = 0
}

locals {
  rds = {
    username = var.RDS_USERNAME
    password = var.RDS_PASSWORD
    host = aws_db_instance.snapsalary_db.address
  }
}

variable "RDS_USERNAME" {
  type = string
  sensitive = true
}

variable "RDS_PASSWORD" {
  type = string
  sensitive = true
}

resource "aws_db_instance" "snapsalary_db" {
  allocated_storage = 10
  engine = "postgres"
  instance_class = "db.t3.micro"
  identifier = "snapsalary"
  name = "snapsalary"
  username = var.RDS_USERNAME
  password = var.RDS_PASSWORD
  apply_immediately = true
  publicly_accessible = true
  storage_encrypted = true
  skip_final_snapshot = true
}

resource "aws_secretsmanager_secret_version" "rds_info" {
  secret_id = aws_secretsmanager_secret.rds_info.id
  secret_string = jsonencode(local.rds)
}
