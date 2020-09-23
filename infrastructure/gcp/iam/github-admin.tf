resource "google_service_account" "github_admin" {
  count        = var.environment == "main" ? 1 : 0
  project      = "sentrei-${var.environment}"
  account_id   = "github-admin"
  display_name = "github-admin"
}

resource "google_project_iam_member" "github_admin_service_account_user" {
  count   = var.environment == "main" ? 1 : 0
  project = "sentrei-${var.environment}"
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.github_admin[count.index].email}"
}

resource "google_project_iam_member" "github_admin_secret_manager_admin" {
  count   = var.environment == "main" ? 1 : 0
  project = "sentrei-${var.environment}"
  role    = "roles/secretmanager.admin"
  member  = "serviceAccount:${google_service_account.github_admin[count.index].email}"
}
