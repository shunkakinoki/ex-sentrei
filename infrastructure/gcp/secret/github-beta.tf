resource "google_secret_manager_secret" "github_beta_email" {
  provider  = google-beta
  secret_id = "github_beta_email"

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}

resource "google_secret_manager_secret" "github_beta_key" {
  provider  = google-beta
  secret_id = "github_beta_key"

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}
