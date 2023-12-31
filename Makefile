start:
	docker-compose up
	npm run dev

start-deps:
	docker-compose up -d
	make migrate
	make seed

start-deps-local:
	docker run --name mava-pg -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=mava-pg -d -p 5432:5432 postgres

stop:
	docker-compose down

migrate:
	npx sequelize-cli db:migrate

stop-deps-local:
	docker stop mava-pg
	docker rm mava-pg

undo-migration:
	npx sequelize-cli db:migrate:undo

undo-all-migrations:
	npx sequelize-cli db:migrate:undo:all

seed:
	npx sequelize-cli db:seed:all

undo-seed:
	npx sequelize-cli db:seed:undo

undo-all-seed:
	npx sequelize-cli db:seed:undo:all

check-code:
	npm run tsc-check && npm run eslint-check && npm run prettier-check

test-integration:
	npm run test:integration
