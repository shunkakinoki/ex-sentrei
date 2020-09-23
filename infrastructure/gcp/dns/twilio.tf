resource "google_dns_record_set" "url5448_sentrei_com_CNAME" {
  name         = "url5448.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["sendgrid.net."]
}

resource "google_dns_record_set" "n16943103_sentrei_com_CNAME" {
  name         = "16943103.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["sendgrid.net."]
}

resource "google_dns_record_set" "em260_sentrei_com_CNAME" {
  name         = "em260.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["u16943103.wl104.sendgrid.net."]
}

resource "google_dns_record_set" "s1_domainkey_sentrei_com_CNAME" {
  name         = "s1._domainkey.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["s1.domainkey.u16943103.wl104.sendgrid.net."]
}

resource "google_dns_record_set" "s2_domainkey_sentrei_com_CNAME" {
  name         = "s2._domainkey.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["s2.domainkey.u16943103.wl104.sendgrid.net."]
}
