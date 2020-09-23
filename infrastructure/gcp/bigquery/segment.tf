resource "google_bigquery_dataset" "segment" {
  dataset_id    = "segment"
  friendly_name = "segment"
  location      = "US"
}
