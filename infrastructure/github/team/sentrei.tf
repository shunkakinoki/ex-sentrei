resource "github_team" "sentrei" {
  name        = "sentrei"
  description = "All Sentrei Team"
  privacy     = "closed"
}

resource "github_team_membership" "sentrei_sentrei_bot" {
  team_id  = github_team.sentrei.id
  username = "sentrei-bot"
  role     = "maintainer"
}

resource "github_team_membership" "sentrei_shunkakinoki" {
  team_id  = github_team.sentrei.id
  username = "shunkakinoki"
  role     = "maintainer"
}

output "sentrei_team_id" {
  value = github_team.sentrei.id
}
