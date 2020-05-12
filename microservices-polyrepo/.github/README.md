# [Basic Micro-Services Kit](./)

> **Note:** This starter kit is optimized for a polyrepo, but can be used in a monorepo too.

- [Basic Micro-Services Kit](#basic-micro-services-kit)
  - [TL;DR](#tldr)
  - [Structure](#structure)
  - [Use Cases](#use-cases)
    - [Local Setup and Updates](#local-setup-and-updates)
    - [Partial Systems](#partial-systems)
    - [Development](#development)
  - [Details](#details)
    - [Makefiles](#makefiles)
    - [Docker-Compose.yaml Files](#docker-composeyaml-files)

## TL;DR

- To start the whole system

  ```sh
  cd local
  docker-compose up
  ```

- To start only needed services

  ```sh
  cd local
  docker-compose up service1
  ```

- To develop a service

  ```sh
  cd local
  docker-compose up router
  cd ..
  cd service1
  make run
  ```

## Structure
  
The structure has two key points:

- [`local`](./local) folder contains the configuration to run the whole system
- [`services`](./services) folder contains the micro services

The structure has the following advantages:

- the whole system can be quickly set up locally
- changes can be easily applied
- developing a service does not require a lot of extra steps

```txt
Graphic: Micro-Services Basic Structure

                           ╭──────────────╮
                           │ ◎ ○ ○ ░░░░░░░│
                           ├──────────────┤             O
                           │              │            /|\
                           │              │◀────────   / \
                           │              │
                           │              │         DEVELOPER
                           └──────────────┘
                                   │
                                   │
                                   │
                                   │
                                   │
                                   ●
                                   ◡
                                   │
                            localhost:7000
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
                                   │
│                                  │                                  │
                                   │
│                          ┌──────────────┐                           │
                           │              │
│                          │    ROUTER    │                           │
                           │              │
│                          └──────────────┘                           │
                                   │
│             ┌────────────────────┼─────────────────────┐            │
              │                    │                     │
│             ▼                    ▼                     ▼            │
      ┌──────────────┐     ┌──────────────┐      ┌──────────────┐
│     │              │     │              │      │              │     │
      │  SERVICE 1   │     │  SERVICE 2   │      │  SERVICE 3   │
│     │              │     │              │      │              │     │
      └──────────────┘     └──────────────┘      └──────────────┘
│                                                                     │

│                                                                     │
 DOCKER NETWORK
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

The developers only interact with the system through a single entry point that
the `ROUTER` provides. This allows the system to hide it internal structure
and be flexible.

## Use Cases

### Local Setup and Updates

Sometimes one just needs the system to run locally.
In this case, the system can be started with the following command:

```sh
cd local
docker-compose up
```

It than runs as depicted above in `Graphic: Micro-Services Basic Structure`

It can be demoed or tested easily this way.
This is can be very useful for other roles than developers, such as:

- UX Engineers who want to try out the live system
- managers who want to demo the application to stakeholders

The local setup usually uses the `:latest` docker images, therefore the updated
only requires a `docker-compose pull` and a restart of the system.

### Partial Systems

As Micro-Services based systems grow, at some point they arrive a point where
it is not possible to run the whole system locally.

The setup also allows to partially start the system by starting only the needed services.

```txt
Graphic: Partially Running System

                           ╭──────────────╮
                           │ ◎ ○ ○ ░░░░░░░│
                           ├──────────────┤             O
                           │              │            /|\
                           │              │◀────────   / \
                           │              │
                           │              │         DEVELOPER
                           └──────────────┘
                                   │
                                   │
                                   │
                                   ●
                                   ◡
                                   │
                            localhost:7000
                                   │
                                  ┌─┐
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤ ├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
                                  └─┘
│                                  │                                  │
                                   ●
│                                  ◡                                  │
                                   │
│                                  │                                  │
                                   │
│                          ┌──────────────┐                           │
                           │              │
│                          │    ROUTER    │                           │
                           │              │
│                          └──────────────┘                           │
                                   │
│             ┌────────────────────┼─────────────────────┐            │
              │                    │                     │
│             ▼                    ▼                     ▼            │
      ┌──────────────┐
│     │              │                                                │
      │  SERVICE 1   │
│     │              │                                                │
      └──────────────┘
│                                                                     │
 DOCKER NETWORK
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

For example, if one wants to start only `SERVICE 1` one only has to
parametrize the `up` command:

```sh
cd local
docker-compose up service1
```

The `depends_on` config makes sure the `ROUTER` and if necessary databases are also started.

> **Hint:** Bigger system may have lot of services that have dependencies.  
> These `docker-compose.yaml` files get quickly unreadable.  
> In this case we use [↗ Rapid Compose](https://github.com/trusz/rapid-compose)

### Development

Development optimally happens isolated. However, practice shows that mocking
dependencies (other services) not always the best or quickest way. Why mock services
if you can easily use the real ones?

```txt
Graphic: Service is Running in Development Mode

                           ╭──────────────╮
                           │ ◎ ○ ○ ░░░░░░░│
                           ├──────────────┤             O
                           │              │            /|\
                           │              │◀────────   / \
                           │              │
                           │              │         DEVELOPER
                           └──────────────┘
                                   │
                                   │
                                   │
                                   ●
                                   ◡
                                   │
                            localhost:7000
                                   │
                                  ┌─┐
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤ ├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
                                  └─┘
│                                  │                                  │
                                   ●
│                                  ◡                                  │
                                   │
│                                  │                                  │
                                   │
│                          ┌──────────────┐                           │
                           │              │
│                          │    ROUTER    │                           │
                           │              │
│                          └──────────────┘                           │
                                   │
│             ┌────────────────────┼─────────────────────┐            │
              │                    │                     │
│             ▼                    ▼                     ▼            │
      ┌──────────────┐     ┌──────────────┐
│     │              │     │  SERVICE 2   │                           │
      │  SERVICE 1   │     │    [DEV]     │
│     │              │     │              │                           │
      └──────────────┘     └──────────────┘
│                                                                     │
 DOCKER NETWORK
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

Starting services in development mode are integrated into the same system as the services in production mode. This can be done by including them in the same docker network
where the production-ready services are running. They take the place of their production-ready variant.

This is a great way to check for integration problems and try out new functionality.

```sh
cd local
docker-compose up router
cd ..
cd service1
make run
```

> **Info:** In a monorepo the make scripts make sure the router is running.  
> Here we have to start it manually.

## Details

Here we explain the details of the setup.

### Makefiles

Makefiles are a great way to automatize without depending on technology stack specific toolings as
they available on most of the environments

> **Hint:** More on makefiles: [↗ Makefile](https://en.wikipedia.org/wiki/Makefile)

The services' [`makefiles`](./makefile) have been created for a polyrepo setup.
They contain their own templates and are independent of each other.

> **Info:** In a monorepo setup the makefile targets would only
> parametrize scripts with the service names, and the scripts would be
> used by all service.

Here is the annotated version

```makefile

# by adding the _name as dependency we get the pre-configured service name
build: _name
      # here we simply build the production image of the service
      # without the @ sign make would print the command, which is usually not useful
      @docker-compose build ${name}

# we don't need the _name as dependency as _start already has it
run:
      # we configure which docker service container is to start
      # the 'run' container is usually the the integration container
      $(eval export docker_image := run)
      # start the service
      @make _start

# we sometimes need to hop in the container, for example, to install dependencies
# that have different dists for different OSes
exec:
      $(eval export docker_image := run)
      $(eval export cmd := sh)
      @make _start

# do not start these: these are configurations and templates
_start: _name
      # we try to create the network in order to use if
      # we do not mind if it already exists
      -@docker network create local_foo-system  2> /dev/null
      # we use the "run" command to be able to interact with the console
      # and allow tests to clear the console
      @docker-compose run \
      # it makes sure we use the same name on the docker network
      # as the production version of service
      --use-aliases \
      # sets the name to the same as the prod version
      # otherwise it would be something like service1-run
      # and the ROUTER would not find it
      --name ${name} \
      --rm \
      # we put together all the configurations
      ${name}-${docker_image} ${cmd}

# configures the name of the software
# this is the only thing we have to change from service to service
_name:
      $(eval export name := service1)
```

We have a [makefile](./makefile) also in the root to make building the whole system easier.

> **Info**: In a monorepo, where we have full control over the folder structure  
> we could automatize it, but in a polyrepo everybody would need the same file structure set up.

```makefile
build:
      # go in, build, go out
      @cd ./services/service1 && make build && cd ../..
      @cd ./services/service2 && make build && cd ../..
      @cd ./services/service3 && make build && cd ../..
```

### Docker-Compose.yaml Files

Here we have the annotated versions of the `docker-compose.yaml` files.

The services' `docker-compose.yaml` files have the same structure:

```yaml
version: "3.6"
networks:
      # this is where we integrate the containers
      # into the same network
      local_foo-system:
            external: true
services:

      # the container without any suffix is the production build
      service3:
            build: .
            image: "service3"

      # the container with '-run' suffix is the integration container
      # this container starts the service and restarts it in case of a file change
      # making it easy to try out a few things
      service3-run:
            image: "nginx:1.17-alpine"
            # the following two commands make the console interactive and
            # clearable for the file watchers and test runners
            stdin_open: true
            tty: true
            networks:
                  - local_foo-system
            # we mount every necessary src file that we can watch for changes
            volumes:
                  - ./src/:/usr/share/nginx/html
                  - ./nginx.conf:/etc/nginx/nginx.conf
            command: ["nginx" , "-g", "daemon off;"]
```

The `docker-compose.yaml` makes sure that we can easily start our system:

```yaml
version: "3.6"
networks:
    # create the network that we can also use
    # in development mode
    foo-system:
      driver: bridge
services:
    router:
        image: "traefik:v1.7-alpine"
        ports:
            # we open only the necessary ports
            - "7000:7000" # open this
            - "9999:9999" # traefik ui
        volumes:
            - ./traefik.toml:/etc/traefik/traefik.toml
        networks:
            - foo-system

    # services do not need to open ports as
    # all the traffic goes the router
    service1:
        image: "service1"
        # this makes sure that the router is always running
        depends_on:
            - "router"
        networks:
            - foo-system

    service2:
        image: "service2"
        depends_on:
            - "router"
        networks:
            - foo-system

    service3:
        image: "service3"
        depends_on:
            - "router"
        networks:
            - foo-system
```
