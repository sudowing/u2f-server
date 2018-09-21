.PHONY: build run start stop clean test connect promote

PROJ_NAME = "u2f-server"
CONTAINER_DEV_IMAGE = "sudowing/u2f-server:develop"

build:
	docker build --pull -t $(CONTAINER_DEV_IMAGE) -f docker/Dockerfile .

release:
	make build
	docker tag $(CONTAINER_DEV_IMAGE) sudowing/u2f-server:master
	# docker tag $(CONTAINER_DEV_IMAGE) sudowing/u2f-server:1.1.0
	docker tag $(CONTAINER_DEV_IMAGE) sudowing/u2f-server:latest
	docker tag $(CONTAINER_DEV_IMAGE) sudowing/u2f-server:edge

publish:
	# docker push sudowing/u2f-server:1.1.0
	docker push sudowing/u2f-server:latest
	docker push sudowing/u2f-server:edge

stop:
	@docker-compose stop

clean:
	@docker-compose -f docker-compose.yml -f docker-compose.development.yml down --remove-orphan

run:
	make build
	@docker-compose -f docker-compose.yml -f docker-compose.development.yml up

start:
	@docker-compose -f docker-compose.yml up -d

# prevent db and cache from starting and override entrypoint (which runs tests && migrations)
test:
	@docker-compose -f docker-compose.yml -f docker-compose.development.yml run --no-deps --entrypoint '' --rm mfa-api npm run test
lint:
	@docker-compose -f docker-compose.yml -f docker-compose.development.yml run --no-deps --entrypoint '' --rm mfa-api npm run lint

# for development | quick method for entering container
connect:
	docker exec -it u2f-server_mfa-api_1 bash

