
build: _name
	@docker-compose build ${name}

run:
	$(eval export docker_image := run)
	@make _start

exec: 
	$(eval export docker_image := run)
	$(eval export cmd := sh)
	@make _start

# do not start these: these are configurations and templates
_start: _name
	-@docker network create local_foo-system  2> /dev/null
	@docker-compose run \
	--use-aliases \
	--name ${name} \
	--rm \
	${name}-${docker_image} ${cmd}

_name: 
	$(eval export name := service3)