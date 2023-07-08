start:
	docker-compose up

start-deps-local:
	docker run --name mava-pg -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=mava-pg -d -p 5432:5432 postgres

stop:
	docker-compose down

migrate:
	docker-compose exec app npx sequelize-cli db:migrate

stop-deps-local:
	docker stop mava-pg
	docker rm mava-pg

undo-migration:
	docker-compose exec app npx sequelize-cli db:migrate:undo

undo-all-migrations:
	docker-compose exec app npx sequelize-cli db:migrate:undo:all

seed:
	docker-compose exec app npx sequelize-cli db:seed:all

undo-seed:
	docker-compose exec app npx sequelize-cli db:seed:undo

undo-all-seed:
	docker-compose exec app npx sequelize-cli db:seed:undo:all

	