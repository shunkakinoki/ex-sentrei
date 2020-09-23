resource "google_bigquery_dataset" "sentrei" {
  dataset_id    = "sentrei"
  friendly_name = "sentrei"
  location      = "US"
}
