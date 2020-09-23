resource "google_storage_bucket" "gcr" {
  name     = "artifacts.sentrei-${var.environment}.appspot.com"
  location = "US"
}
