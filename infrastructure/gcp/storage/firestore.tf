resource "google_storage_bucket" "firestore" {
  name     = "sentrei-${var.environment}-firestore"
  location = "US"
}
