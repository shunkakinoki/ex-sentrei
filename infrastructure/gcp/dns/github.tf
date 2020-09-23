resource "google_dns_record_set" "github_sentrei_com_TXT" {
  name         = "_github-challenge-sentrei.${google_dns_managed_zone.sentrei.dns_name}"
  managed_zone = google_dns_managed_zone.sentrei.name
  type         = "TXT"
  ttl          = 300

  rrdatas = ["26d34ccc55"]
}
