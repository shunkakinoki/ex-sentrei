data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service" "sentrei_web" {
  provider = google-beta
  name     = "sentrei-${var.environment}-web"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "gcr.io/sentrei-${var.environment}/sentrei:${var.environment}"
        env {
          name  = "FIREBASE_CLIENT_EMAIL"
          value = var.firebase_client_email
        }
        env {
          name  = "FIREBASE_PRIVATE_KEY"
          value = var.firebase_private_key
        }
        resources {
          limits = { "cpu" : "1000m", "memory" : "512Mi" }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
  autogenerate_revision_name = true
}

resource "google_cloud_run_service_iam_policy" "sentrei_web" {
  location    = google_cloud_run_service.sentrei_web.location
  project     = google_cloud_run_service.sentrei_web.project
  service     = google_cloud_run_service.sentrei_web.name
  policy_data = data.google_iam_policy.noauth.policy_data
}
