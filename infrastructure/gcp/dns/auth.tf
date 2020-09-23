resource "google_dns_record_set" "auth_sentrei_com_CNAME" {
  name         = "auth.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["sentrei-main.firebaseapp.com."]
}

resource "google_dns_record_set" "alpha_auth_sentrei_com_CNAME" {
  name         = "alpha.auth.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["sentrei-alpha.firebaseapp.com."]
}

resource "google_dns_record_set" "beta_auth_sentrei_com_CNAME" {
  name         = "beta.auth.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["sentrei-beta.firebaseapp.com."]
}

resource "google_dns_record_set" "main_auth_sentrei_com_CNAME" {
  name         = "main.auth.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "CNAME"
  ttl          = 300

  rrdatas = ["sentrei-main.firebaseapp.com."]
}
