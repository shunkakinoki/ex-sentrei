resource "google_secret_manager_secret" "github_main_email" {
  provider  = google-beta
  secret_id = "github_main_email"

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}

resource "google_secret_manager_secret_iam_member" "github_main_email" {
  provider  = google-beta
  project   = google_secret_manager_secret.github_main_email.project
  secret_id = google_secret_manager_secret.github_main_email.secret_id
  role      = "roles/viewer"
  member    = "serviceAccount:${var.email}"
}

resource "google_secret_manager_secret" "github_main_key" {
  provider  = google-beta
  secret_id = "github_main_key"

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}

resource "google_secret_manager_secret_iam_member" "github_main_key" {
  provider  = google-beta
  project   = google_secret_manager_secret.github_main_key.project
  secret_id = google_secret_manager_secret.github_main_key.secret_id
  role      = "roles/viewer"
  member    = "serviceAccount:${var.email}"
}
