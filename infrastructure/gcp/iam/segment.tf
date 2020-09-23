resource "google_service_account" "segment" {
  project      = "sentrei-${var.environment}"
  account_id   = "segment"
  display_name = "segment"
}

resource "google_project_iam_member" "segment_service_account_user" {
  project = "sentrei-${var.environment}"
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.segment.email}"
}

resource "google_project_iam_member" "segment_big_query_admin" {
  project = "sentrei-${var.environment}"
  role    = "roles/bigquery.admin"
  member  = "serviceAccount:${google_service_account.segment.email}"
}
