resource "google_cloudbuild_trigger" "sentrei" {
  provider = google-beta

  github {
    owner = "sentrei"
    name  = "sentrei"

    pull_request {
      comment_control = "COMMENTS_ENABLED"
    }
  }

  filename = "packages/web/cloudbuild.yaml"
}
