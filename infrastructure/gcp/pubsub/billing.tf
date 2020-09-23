resource "google_pubsub_topic" "billing" {
  name = "sentrei-${var.environment}-billing"
}
