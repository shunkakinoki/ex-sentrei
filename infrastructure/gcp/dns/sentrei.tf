resource "google_dns_record_set" "sentrei_com_A" {
  name         = google_dns_managed_zone.sentrei.dns_name
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "A"
  ttl          = 300

  rrdatas = ["76.76.21.21"]
}

resource "google_dns_record_set" "sentrei_com_MX" {
  name         = google_dns_managed_zone.sentrei.dns_name
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "MX"
  ttl          = 300

  rrdatas = ["1 aspmx.l.google.com.", "5 alt1.aspmx.l.google.com.", "5 alt2.aspmx.l.google.com.", "10 alt3.aspmx.l.google.com.", "10 alt4.aspmx.l.google.com."]
}

resource "google_dns_record_set" "sentrei_com_SPF" {
  name         = google_dns_managed_zone.sentrei.dns_name
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "SPF"
  ttl          = 300

  rrdatas = ["\"v=spf1\" \"include:_spf.google.com\" \"~all\""]
}

resource "google_dns_record_set" "sentrei_com_TXT" {
  name         = google_dns_managed_zone.sentrei.dns_name
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "TXT"
  ttl          = 300

  rrdatas = ["google-site-verification=_SIRccUJfM_2d2h_pFobDrrPUlm-iNAbqHDYH3qPBxQ"]
}
