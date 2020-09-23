resource "google_project_iam_member" "owner" {
  project = "sentrei-${var.environment}"
  role    = "roles/owner"
  member  = "user:shunkakinoki@gmail.com"
}
