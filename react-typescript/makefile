.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Build production docker image
	@docker-compose build ui

publish: ## Publish built image. Don't forget to build firs!
	@docker-compose push ui

run: ## Starts the service
	@yarn start

test: ## Tests the service once
	@yarn test
