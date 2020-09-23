provider "aws" {
  region = "us-east-1"
}

provider "google" {
  region = "us-central1"
}

module "aws-iam" {
  source      = "../../aws/iam"
  environment = var.environment
}

# module "gcp-firebase" {
#   environment = var.environment
#   source      = "../../gcp/firebase"
# }

module "gcp-iam" {
  source      = "../../gcp/iam"
  environment = var.environment
}

module "gcp-pubsub" {
  source      = "../../gcp/pubsub"
  environment = var.environment
}

module "gcp-run" {
  source                = "../../gcp/run"
  environment           = var.environment
  firebase_client_email = var.firebase_client_email
  firebase_private_key  = var.firebase_private_key
}

module "gcp-storage" {
  source      = "../../gcp/storage"
  environment = var.environment
}
