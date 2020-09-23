provider "aws" {
  region = "us-east-1"
}

provider "github" {
  organization = "sentrei"
}

provider "google" {
  region = "us-central1"
}

provider "google-beta" {
  region = "us-central1"
}

module "aws-iam" {
  source      = "../../aws/iam"
  environment = var.environment
}

module "gcp-bigquery" {
  source      = "../../gcp/bigquery"
  environment = var.environment
}

module "gcp-dns" {
  source = "../../gcp/dns"
}

# module "gcp-firebase" {
#   environment = var.environment
#   source      = "../../gcp/firebase"
# }

module "gcp-iam" {
  source      = "../../gcp/iam"
  environment = var.environment
}

module "gcp-monitoring" {
  source = "../../gcp/monitoring"
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

module "gcp-secret" {
  source = "../../gcp/secret"
  email  = module.gcp-iam.google_service_account_github_email
}

module "gcp-storage" {
  source      = "../../gcp/storage"
  environment = var.environment
}

module "github-org" {
  source = "../../github/org"
}

module "github-repo" {
  source                 = "../../github/repo"
  admin_team_id          = module.github-team.admin_team_id
  infrastructure_team_id = module.github-team.infrastructure_team_id
  review_team_id         = module.github-team.review_team_id
  sentrei_team_id        = module.github-team.sentrei_team_id
}

module "github-team" {
  source = "../../github/team"
}
