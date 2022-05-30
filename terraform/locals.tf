locals {
  create_default_resource = terraform.workspace == "default" ? 1 : 0
}
