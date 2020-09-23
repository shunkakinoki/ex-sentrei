resource "google_dns_record_set" "dartdoc_sentrei_com_A" {
  name         = "dartdoc.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "A"
  ttl          = 300

  rrdatas = ["151.101.1.195", "151.101.65.195"]
}

resource "google_dns_record_set" "alpha_dartdoc_sentrei_com_A" {
  name         = "alpha.dartdoc.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "A"
  ttl          = 300

  rrdatas = ["151.101.1.195", "151.101.65.195"]
}

resource "google_dns_record_set" "beta_dartdoc_sentrei_com_A" {
  name         = "beta.dartdoc.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "A"
  ttl          = 300

  rrdatas = ["151.101.1.195", "151.101.65.195"]
}

resource "google_dns_record_set" "main_dartdoc_sentrei_com_A" {
  name         = "main.dartdoc.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "A"
  ttl          = 300

  rrdatas = ["151.101.1.195", "151.101.65.195"]
}
