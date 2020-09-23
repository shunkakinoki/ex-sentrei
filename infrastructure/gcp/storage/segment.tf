resource "google_storage_bucket" "segment" {
  name     = "sentrei-${var.environment}-segment"
  location = "US"
}
