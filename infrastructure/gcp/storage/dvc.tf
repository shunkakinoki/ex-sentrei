resource "google_storage_bucket" "dvc" {
  count    = var.environment == "main" ? 1 : 0
  name     = "sentrei-${var.environment}-dvc"
  location = "US"
}
