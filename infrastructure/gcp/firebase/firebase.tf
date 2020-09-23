resource "google_firebase_project" "sentrei" {
  provider = google-beta
  project  = "sentrei-${var.environment}"
}
