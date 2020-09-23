resource "google_bigquery_dataset" "stripe" {
  dataset_id    = "stripe"
  friendly_name = "stripe"
  location      = "US"
}
