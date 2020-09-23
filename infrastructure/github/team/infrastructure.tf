resource "github_team" "infrastructure" {
  name        = "infrastructure"
  description = "Infrastructure for Sentrei"
  privacy     = "closed"
}

resource "github_team_membership" "infrastructure_sentrei_bot" {
  team_id  = github_team.infrastructure.id
  username = "sentrei-bot"
  role     = "maintainer"
}

resource "github_team_membership" "infrastructure_shunkakinoki" {
  team_id  = github_team.infrastructure.id
  username = "shunkakinoki"
  role     = "maintainer"
}

output "infrastructure_team_id" {
  value = github_team.infrastructure.id
}
