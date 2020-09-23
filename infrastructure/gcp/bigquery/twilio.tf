resource "google_bigquery_dataset" "twilio" {
  dataset_id    = "twilio"
  friendly_name = "twilio"
  location      = "US"
}
