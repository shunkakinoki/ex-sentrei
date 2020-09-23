resource "github_team" "frontend" {
  name        = "frontend"
  description = "Frontend for Sentrei"
  privacy     = "closed"
}

resource "github_team_membership" "frontend_shunkakinoki" {
  team_id  = github_team.frontend.id
  username = "shunkakinoki"
  role     = "maintainer"
}

output "frontend_team_id" {
  value = github_team.frontend.id
}
