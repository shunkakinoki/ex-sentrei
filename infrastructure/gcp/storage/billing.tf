resource "google_storage_bucket" "billing" {
  count    = var.environment == "main" ? 1 : 0
  name     = "sentrei-${var.environment}-billing"
  location = "US"
}
