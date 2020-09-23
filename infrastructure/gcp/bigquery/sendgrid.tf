resource "google_bigquery_dataset" "sendgrid" {
  dataset_id    = "sendgrid"
  friendly_name = "sendgrid"
  location      = "US"
}
