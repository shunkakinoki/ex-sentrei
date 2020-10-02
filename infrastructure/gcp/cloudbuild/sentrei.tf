resource "google_cloudbuild_trigger" "sentrei" {
  provider = google-beta

  github {
    owner = "sentrei"
    name  = "sentrei"

    push {
      tag = "v*"
    }
  }

  filename = "packages/web/cloudbuild.yaml"
}
