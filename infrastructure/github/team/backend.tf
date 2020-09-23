resource "github_team" "backend" {
  name        = "backend"
  description = "Backend for Sentrei"
  privacy     = "closed"
}

resource "github_team_membership" "backend_shunkakinoki" {
  team_id  = github_team.backend.id
  username = "shunkakinoki"
  role     = "maintainer"
}

output "backend_team_id" {
  value = github_team.backend.id
}
