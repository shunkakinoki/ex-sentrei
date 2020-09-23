terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "sentrei"
    workspaces {
      name = "sentrei-alpha"
    }
  }
  required_providers {
    aws         = "~> 3.3.0"
    github      = "~> 2.9.2"
    google      = "~> 3.35.0"
    google-beta = "~> 3.35.0"
  }
  required_version = "=0.13.0"
}
