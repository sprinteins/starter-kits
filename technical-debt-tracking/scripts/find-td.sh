#!/bin/sh


if [ "$#" -eq 0 ]; then
    grep --color -nr "// TODO:" ./src
else

    for var in "$@"
    do
        grep --color -nr "// TODO: ${var}" ./src
    done
fi

