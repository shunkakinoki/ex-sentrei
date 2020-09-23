resource "google_monitoring_uptime_check_config" "sentrei" {
  display_name = "Sentrei Uptime Check"
  period       = "60s"
  timeout      = "60s"

  http_check {
    path         = "/"
    port         = "443"
    use_ssl      = true
    validate_ssl = true
  }

  monitored_resource {
    type = "uptime_url"
    labels = {
      project_id = "sentrei-main"
      host       = "sentrei.com"
    }
  }
}

resource "google_monitoring_alert_policy" "sentrei" {
  display_name = "Sentrei Alert Policy"
  combiner     = "OR"
  conditions {
    display_name = "Request Latency"
    condition_threshold {
      filter          = "metric.type=\"monitoring.googleapis.com/uptime_check/request_latency\" AND resource.type=\"uptime_url\" AND metric.label.\"check_id\"=\"${google_monitoring_uptime_check_config.sentrei.uptime_check_id}\""
      duration        = "0s"
      threshold_value = 1000
      comparison      = "COMPARISON_GT"
      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_MEAN"
      }
    }
  }
}
