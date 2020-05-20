#!/bin/sh

finalCount=0

if [ "$#" -eq 0 ]; then
    count=$(grep --color -nr "// TODO: " ./src | wc -l)
    finalCount=$((finalCount+count))
else
    for var in "$@"
    do
        count=$(grep --color -nr "// TODO: ${var}" ./src | wc -l)
        finalCount=$((finalCount+count))
    done
fi

echo ""
echo "Number of technical-debt: $((finalCount))"
echo ""