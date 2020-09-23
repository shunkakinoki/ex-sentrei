resource "github_repository" "sentrei" {
  name           = "sentrei"
  description    = "Bond. Focus. Work."
  homepage_url   = "https://sentrei.com"
  default_branch = "main"

  archived               = false
  private                = false
  has_issues             = true
  has_projects           = true
  has_wiki               = false
  is_template            = false
  allow_merge_commit     = true
  allow_squash_merge     = true
  allow_rebase_merge     = false
  delete_branch_on_merge = true

  topics = ["firebase", "jamstack", "material-ui", "monorepo", "nextjs", "oss", "react", "saas", "serverless", "typescript", "webapp"]
}

resource "github_branch_protection" "sentrei_alpha" {
  repository     = github_repository.sentrei.name
  branch         = "alpha"
  enforce_admins = false

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "cla", "functions", "labeler", "ui", "yarn", "video", "web", "WIP"]
  }

  restrictions {
    teams = ["admin"]
  }
}

resource "github_branch_protection" "sentrei_beta" {
  repository     = github_repository.sentrei.name
  branch         = "beta"
  enforce_admins = false

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "cla", "functions", "labeler", "ui", "yarn", "video", "web", "WIP"]
  }

  restrictions {
    teams = ["admin"]
  }
}

resource "github_branch_protection" "sentrei_main" {
  repository     = github_repository.sentrei.name
  branch         = "main"
  enforce_admins = false

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "cla", "functions", "labeler", "ui", "yarn", "video", "web", "WIP"]
  }

  restrictions {
    teams = ["admin"]
  }
}

resource "github_team_repository" "sentrei_admin" {
  team_id    = var.admin_team_id
  repository = github_repository.sentrei.name
  permission = "admin"
}

resource "github_team_repository" "sentrei_maintain" {
  team_id    = var.review_team_id
  repository = github_repository.sentrei.name
  permission = "maintain"
}

resource "github_team_repository" "sentrei_pull" {
  team_id    = var.sentrei_team_id
  repository = github_repository.sentrei.name
  permission = "pull"
}
