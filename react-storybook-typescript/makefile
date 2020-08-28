.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: _name ## Builds Storybook Image
	@docker-compose build ${name}

build-lib: _name ## Build the UI-Library
	@docker-compose up --build ${name}-build

run: ## Starts the UI-Library at http://localhost:9000
	$(eval export docker_image := run)
	@make _start

dev: ## Starts TDD mode (run tests on every file change)
	$(eval export docker_image := dev)
	@./scripts/launch-local-browser.sh && \
	make _start

test: ## Tests the UI-Library once
	$(eval export docker_image := test)
	@make _start

exec: ## Starts the `dev` container and enters its shell
	$(eval export docker_image := dev)
	$(eval export cmd := sh)
	@make _start

# do not start these: these are configurations and templates
_start: _name
	@docker-compose run \
	--service-ports \
	--use-aliases \
	--rm ${name}-${docker_image} ${cmd}

	@docker-compose down

_name: 
	$(eval export name := ui-lib)