resource "google_project_iam_member" "appspot_cloud_functions_service_agent" {
  project = "sentrei-${var.environment}"
  role    = "roles/cloudfunctions.serviceAgent"
  member  = "serviceAccount:sentrei-${var.environment}@appspot.gserviceaccount.com"
}

resource "google_project_iam_member" "appspot_firebase_admin" {
  project = "sentrei-${var.environment}"
  role    = "roles/firebase.admin"
  member  = "serviceAccount:sentrei-${var.environment}@appspot.gserviceaccount.com"
}
