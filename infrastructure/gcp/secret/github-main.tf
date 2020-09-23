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
