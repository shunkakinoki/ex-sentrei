resource "google_project_iam_member" "cloud_functions_service_agent" {
  project = "sentrei-${var.environment}"
  role    = "roles/cloudfunctions.serviceAgent"
  member  = "serviceAccount:service-${data.google_project.project.number}@gcf-admin-robot.iam.gserviceaccount.com"
}

resource "google_project_iam_member" "cloud_functions_firebase_admin" {
  project = "sentrei-${var.environment}"
  role    = "roles/firebase.admin"
  member  = "serviceAccount:service-${data.google_project.project.number}@gcf-admin-robot.iam.gserviceaccount.com"
}
