resource "google_cloudbuild_trigger" "sentrei" {
  provider = google-beta
  name     = "cloud-build-${var.environment}"
  filename = "packages/web/cloudbuild.yaml"

  github {
    owner = "sentrei"
    name  = "sentrei"

    push {
      branch = "^${var.environment}$"
    }
  }

}
