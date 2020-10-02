resource "github_team" "kodiak" {
  name        = "kodiak"
  description = "Kodiak for Sentrei"
  privacy     = "closed"
}

resource "github_team_membership" "kodiak_kodiakhq" {
  team_id  = github_team.kodiak.id
  username = "kodiakhq"
  role     = "member"
}
