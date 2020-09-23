resource "github_repository" "sales" {
  name           = "sales"
  description    = "Sales for Sentrei"
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

  topics = ["crm", "insight", "sales"]
}

resource "github_branch_protection" "sales_master" {
  repository     = github_repository.sales.name
  branch         = "master"
  enforce_admins = false

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
  }

  required_status_checks {
    strict   = true
    contexts = ["auto-approve", "sales", "yarn"]
  }

  restrictions {
    teams = ["admin"]
  }
}

resource "github_team_repository" "sales_admin" {
  team_id    = var.admin_team_id
  repository = github_repository.sales.name
  permission = "admin"
}

resource "github_team_repository" "sales_maintain" {
  team_id    = var.review_team_id
  repository = github_repository.sales.name
  permission = "maintain"
}

resource "github_team_repository" "sales_pull" {
  team_id    = var.sentrei_team_id
  repository = github_repository.sales.name
  permission = "pull"
}
