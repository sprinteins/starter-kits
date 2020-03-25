#!/bin/sh

yarn concurrently \
    --prefix-colors blue,green \
    --names FE,TEST \
    --kill-others \
"yarn start" "yarn test"
