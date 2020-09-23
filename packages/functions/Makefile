SECRETS_VERSION = 1

secrets-create-all: secrets-create-alpha secrets-create-beta secrets-create-main

secrets-create-alpha:
	gcloud secrets create functions_alpha_env --data-file="alpha.env.json" --locations=us-central1 --replication-policy="user-managed"

secrets-create-beta:
	gcloud secrets create functions_beta_env --data-file="beta.env.json" --locations=us-central1 --replication-policy="user-managed"

secrets-create-main:
	gcloud secrets create functions_main_env --data-file="main.env.json" --locations=us-central1 --replication-policy="user-managed"

secrets-delete-all: secrets-delete-alpha secrets-delete-beta secrets-delete-main

secrets-delete-alpha:
	gcloud secrets delete functions_alpha_env

secrets-delete-beta:
	gcloud secrets delete functions_beta_env

secrets-delete-main:
	gcloud secrets delete functions_main_env

secrets-get-all: secrets-get-alpha secrets-get-beta secrets-get-main

secrets-get-alpha:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=functions_alpha_env > alpha.env.json

secrets-get-beta:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=functions_beta_env > beta.env.json

secrets-get-main:
	gcloud secrets versions access $(SECRETS_VERSION) --secret=functions_main_env > main.env.json

secrets-list-all: secrets-list-alpha secrets-list-beta secrets-list-main

secrets-list-alpha:
	gcloud secrets versions list functions_alpha_env --limit=1

secrets-list-beta:
	gcloud secrets versions list functions_beta_env --limit=1

secrets-list-main:
	gcloud secrets versions list functions_main_env --limit=1

secrets-set-all: secrets-set-alpha secrets-set-beta secrets-set-main

secrets-set-alpha:
	gcloud secrets versions add "functions_alpha_env" --data-file="alpha.env.json"

secrets-set-beta:
	gcloud secrets versions add "functions_beta_env" --data-file="beta.env.json"

secrets-set-main:
	gcloud secrets versions add "functions_main_env" --data-file="main.env.json"

firestore-delete-alpha:
	yarn run alpha:local
	yarn run firebase firestore:delete --all-collections 

firestore-delete-beta:
	yarn run beta:local
	yarn run firebase firestore:delete --all-collections 