#!/bin/sh

PORT=${DEV_SERVER_PORT:-9000}

start-storybook -p ${PORT} --ci --quiet