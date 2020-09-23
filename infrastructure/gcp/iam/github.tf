resource "google_service_account" "github" {
  project      = "sentrei-${var.environment}"
  account_id   = "github"
  display_name = "github"
}

resource "google_project_iam_member" "github_service_account_user" {
  project = "sentrei-${var.environment}"
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.github.email}"
}

resource "google_project_iam_member" "github_project_run_admin" {
  project = "sentrei-${var.environment}"
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.github.email}"
}

resource "google_project_iam_member" "github_project_storage_admin" {
  project = "sentrei-${var.environment}"
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.github.email}"
}

resource "google_project_iam_member" "datastore_import_export_admin" {
  project = "sentrei-${var.environment}"
  role    = "roles/datastore.importExportAdmin"
  member  = "serviceAccount:${google_service_account.github.email}"
}

output "google_service_account_github_email" {
  value = google_service_account.github.email
}
