# 1. copy makefile
# 2. replace `__name__` with the service name
# 3. remove this comment block from the new makefile 
.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: _name ## Build production docker image
	@docker-compose build ${name}

run: ## Starts the service
	$(eval export docker_image := run)
	@make _start

dev: ## Starts the service in TDD mode (test + file watching)
	$(eval export docker_image := dev)
	@make _start

test: ## Tests the service once
	$(eval export docker_image := test)
	@make _start

exec: ## Starts the `dev` container and enters its shell
	$(eval export docker_image := dev)
	$(eval export cmd := bash)
	@make _start

# do not start these: these are configurations and templates
_start: _name
	@docker-compose run \
	--service-ports \
	--use-aliases \
	--rm ${name}-${docker_image} ${cmd}

_name: 
	$(eval export name := __name__)