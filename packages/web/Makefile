SECRETS_VERSION = 1

secrets-create-all: secrets-create-alpha secrets-create-beta secrets-create-main

secrets-create-alpha:
	gcloud secrets create web_alpha_env --data-file=".alpha.env" --locations=us-central1 --replication-policy="user-managed"

secrets-create-beta:
	gcloud secrets create web_beta_env --data-file=".beta.env" --locations=us-central1 --replication-policy="user-managed"

secrets-create-main:
	gcloud secrets create web_main_env --data-file=".main.env" --locations=us-central1 --replication-policy="user-managed"

secrets-delete-all: secrets-delete-alpha secrets-delete-beta secrets-delete-main

secrets-delete-alpha:
	gcloud secrets delete web_alpha_env

secrets-delete-beta:
	gcloud secrets delete web_beta_env

secrets-delete-main:
	gcloud secrets delete web_main_env

secrets-get-all: secrets-get-alpha secrets-get-beta secrets-get-main

secrets-get-alpha:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=web_alpha_env > .alpha.env
	cp .alpha.env ../../.env.development

secrets-get-beta:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=web_beta_env > .beta.env
	cp .beta.env ../../.env.preview

secrets-get-main:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=web_main_env > .main.env
	cp .main.env ../../.env.production

secrets-list-all: secrets-list-alpha secrets-list-beta secrets-list-main

secrets-list-alpha:
	gcloud secrets versions list web_alpha_env --limit=1

secrets-list-beta:
	gcloud secrets versions list web_beta_env --limit=1

secrets-list-main:
	gcloud secrets versions list web_main_env --limit=1

secrets-set-all: secrets-set-alpha secrets-set-beta secrets-set-main

secrets-set-alpha:
	gcloud secrets versions add "web_alpha_env" --data-file=".alpha.env"

secrets-set-beta:
	gcloud secrets versions add "web_beta_env" --data-file=".beta.env"

secrets-set-main:
	gcloud secrets versions add "web_main_env" --data-file=".main.env"
