resource "google_secret_manager_secret" "github_alpha_email" {
  provider  = google-beta
  secret_id = "github_alpha_email"

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}

resource "google_secret_manager_secret" "github_alpha_key" {
  provider  = google-beta
  secret_id = "github_alpha_key"

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}
