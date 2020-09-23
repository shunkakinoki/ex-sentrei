resource "github_team" "admin" {
  name        = "admin"
  description = "Admin for Sentrei"
  privacy     = "closed"
}

resource "github_team_membership" "admin_sentrei_bot" {
  team_id  = github_team.admin.id
  username = "sentrei-bot"
  role     = "maintainer"
}

output "admin_team_id" {
  value = github_team.admin.id
}
