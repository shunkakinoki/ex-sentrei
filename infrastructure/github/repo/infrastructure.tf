resource "github_repository" "infrastructure" {
  name           = "infrastructure"
  description    = "Infrastructure at Sentrei"
  homepage_url   = "https://sentrei.com"
  default_branch = "main"

  archived               = true
  private                = true
  has_issues             = true
  has_projects           = false
  has_wiki               = false
  is_template            = false
  allow_merge_commit     = true
  allow_squash_merge     = true
  allow_rebase_merge     = false
  delete_branch_on_merge = true

  topics = ["iaac", "infrastructure", "terraform"]
}

resource "github_branch_protection" "infrastructure_alpha" {
  repository     = github_repository.infrastructure.name
  branch         = "alpha"
  enforce_admins = false

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "terraform (alpha)", "terraform (beta)", "terraform (main)", "Terraform Cloud/sentrei/sentrei-alpha"]
  }

  restrictions {
    users = ["kodiakhq"]
    teams = ["admin"]
  }
}

resource "github_branch_protection" "infrastructure_beta" {
  repository     = github_repository.infrastructure.name
  branch         = "beta"
  enforce_admins = false

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "terraform (alpha)", "terraform (beta)", "terraform (main)", "Terraform Cloud/sentrei/sentrei-beta"]
  }

  restrictions {
    users = ["kodiakhq"]
    teams = ["admin"]
  }
}

resource "github_branch_protection" "infrastructure_main" {
  repository     = github_repository.infrastructure.name
  branch         = "main"
  enforce_admins = false

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "terraform (alpha)", "terraform (beta)", "terraform (main)", "Terraform Cloud/sentrei/sentrei-main"]
  }

  restrictions {
    users = ["kodiakhq"]
    teams = ["admin"]
  }
}

resource "github_team_repository" "infrastructure_admin" {
  team_id    = var.admin_team_id
  repository = github_repository.infrastructure.name
  permission = "admin"
}

resource "github_team_repository" "infrastructure_maintain" {
  team_id    = var.infrastructure_team_id
  repository = github_repository.infrastructure.name
  permission = "maintain"
}

resource "github_team_repository" "infrastructure_pull" {
  team_id    = var.sentrei_team_id
  repository = github_repository.infrastructure.name
  permission = "pull"
}
