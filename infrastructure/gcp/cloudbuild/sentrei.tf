resource "google_cloudbuild_trigger" "sentrei" {
  provider = google-beta

  github {
    owner = "sentrei"
    name  = "sentrei"

    push {
      branch = "^${var.environment}$"
    }
  }

  filename       = "packages/web/cloudbuild.yaml"
  included_files = "CHANGELOG.md"
}
