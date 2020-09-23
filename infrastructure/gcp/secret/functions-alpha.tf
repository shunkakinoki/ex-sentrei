resource "google_secret_manager_secret" "functions_alpha_env" {
  provider  = google-beta
  secret_id = "functions_alpha_env"

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}
