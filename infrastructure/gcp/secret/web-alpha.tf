resource "google_secret_manager_secret" "web_alpha_env" {
  provider  = google-beta
  secret_id = "web_alpha_env"

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}

resource "google_secret_manager_secret_iam_member" "web_alpha_env" {
  provider  = google-beta
  project   = google_secret_manager_secret.web_alpha_env.project
  secret_id = google_secret_manager_secret.web_alpha_env.secret_id
  role      = "roles/viewer"
  member    = "serviceAccount:${var.email}"
}
