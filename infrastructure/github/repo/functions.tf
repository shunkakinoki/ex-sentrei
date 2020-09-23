resource "github_repository" "functions" {
  name           = "functions"
  description    = "Firebase Functions for Sentrei"
  homepage_url   = "https://sentrei.com"
  default_branch = "main"

  private                = true
  has_issues             = true
  has_projects           = false
  has_wiki               = false
  is_template            = false
  allow_merge_commit     = true
  allow_squash_merge     = true
  allow_rebase_merge     = false
  delete_branch_on_merge = true

  topics = ["firebase", "functions", "serverless"]
}

resource "github_branch_protection" "functions_alpha" {
  repository     = github_repository.functions.name
  branch         = "alpha"
  enforce_admins = false

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "functions", "yarn"]
  }

  restrictions {
    teams = ["admin"]
  }
}

resource "github_branch_protection" "functions_beta" {
  repository     = github_repository.functions.name
  branch         = "beta"
  enforce_admins = false

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "functions", "yarn"]
  }

  restrictions {
    teams = ["admin"]
  }
}

resource "github_branch_protection" "functions_main" {
  repository     = github_repository.functions.name
  branch         = "main"
  enforce_admins = false

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "functions", "yarn"]
  }

  restrictions {
    teams = ["admin"]
  }
}

resource "github_team_repository" "functions_admin" {
  team_id    = var.admin_team_id
  repository = github_repository.functions.name
  permission = "admin"
}

resource "github_team_repository" "functions_maintain" {
  team_id    = var.review_team_id
  repository = github_repository.functions.name
  permission = "maintain"
}

resource "github_team_repository" "functions_pull" {
  team_id    = var.sentrei_team_id
  repository = github_repository.functions.name
  permission = "pull"
}
