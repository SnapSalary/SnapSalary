locals {
  create_default_resource = terraform.workspace == "main" ? 1 : 0
}
