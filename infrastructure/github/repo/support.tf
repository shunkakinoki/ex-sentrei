resource "github_repository" "support" {
  name           = "support"
  description    = "Support for Sentrei"
  homepage_url   = "https://sentrei.com"
  default_branch = "master"

  private                = true
  has_issues             = true
  has_projects           = false
  has_wiki               = false
  is_template            = false
  allow_merge_commit     = true
  allow_squash_merge     = true
  allow_rebase_merge     = false
  delete_branch_on_merge = true

  topics = ["crm", "papercups", "support"]
}

resource "github_branch_protection" "support_master" {
  repository     = github_repository.support.name
  branch         = "master"
  enforce_admins = false

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "support", "yarn"]
  }

  restrictions {
    teams = ["admin"]
  }
}

resource "github_team_repository" "support_admin" {
  team_id    = var.admin_team_id
  repository = github_repository.support.name
  permission = "admin"
}

resource "github_team_repository" "support_maintain" {
  team_id    = var.review_team_id
  repository = github_repository.support.name
  permission = "maintain"
}

resource "github_team_repository" "support_pull" {
  team_id    = var.sentrei_team_id
  repository = github_repository.support.name
  permission = "pull"
}
