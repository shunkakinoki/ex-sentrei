resource "google_project_iam_member" "cloud_build_cloud_build_builds_buiilder" {
  project = "sentrei-${var.environment}"
  role    = "roles/cloudbuild.builds.builder"
  member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

resource "google_project_iam_member" "cloud_build_service_account_user" {
  project = "sentrei-${var.environment}"
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

resource "google_project_iam_member" "cloud_build_secret_manager_secret_accessor" {
  project = "sentrei-${var.environment}"
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}
