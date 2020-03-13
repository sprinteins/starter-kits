# 1. copy makefile
# 2. replace `__name__` with the service name
# 3. remove this comment block from the new makefile 
build: _name
	@docker-compose build ${name}

run:
	$(eval export docker_image := run)
	@make _start

dev: 
	$(eval export docker_image := dev)
	@make _start

test:
	$(eval export docker_image := test)
	@make _start

exec: 
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