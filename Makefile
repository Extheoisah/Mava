start-dev:
	npm run dev

start-deps:
	docker run --name mava-pg -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=mava-pg -d -p 5432:5432 postgres

stop-deps:
	docker stop mava-pg
	docker rm mava-pg

migration:
	npx sequelize-cli db:migrate

undo-migration:
	npx sequelize-cli db:migrate:undo

	