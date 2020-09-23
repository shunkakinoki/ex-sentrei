resource "github_team" "oss" {
  name        = "oss"
  description = "Sentrei Oss Team"
  privacy     = "closed"
}

resource "github_team_membership" "oss_shunkakinoki" {
  team_id  = github_team.oss.id
  username = "shunkakinoki"
  role     = "maintainer"
}

output "oss_team_id" {
  value = github_team.oss.id
}
