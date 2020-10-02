resource "google_cloudbuild_trigger" "sentrei" {
  provider = google-beta

  github {
    owner          = "sentrei"
    name           = "sentrei"
    included_files = "CHANGELOG.md"

    push {
      branch = "^${var.environment}$"
    }
  }

  filename = "packages/web/cloudbuild.yaml"
}
