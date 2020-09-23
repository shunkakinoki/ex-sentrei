resource "github_team" "review" {
  name        = "review"
  description = "Reviewers for Sentrei"
  privacy     = "closed"
}

resource "github_team_membership" "review_shunkakinoki" {
  team_id  = github_team.review.id
  username = "shunkakinoki"
  role     = "maintainer"
}

output "review_team_id" {
  value = github_team.review.id
}
