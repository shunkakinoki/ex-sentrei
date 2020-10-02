resource "google_cloudbuild_trigger" "sentrei_pull_request" {
  provider = google-beta

  github {
    owner = "sentrei"
    name  = "sentrei"

    pull_request {
      branch          = var.environment
      comment_control = "COMMENTS_ENABLED"
    }
  }

  filename = "packages/web/cloudbuild.yaml"
}

resource "google_cloudbuild_trigger" "sentrei_push" {
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
