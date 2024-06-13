down:
	docker compose down

deploy: down
	git checkout production
	git pull
	cp ./rendezvous_app/.env_production ./rendezvous_app/.env
	docker compose up -d --build
	git reset HEAD --hard