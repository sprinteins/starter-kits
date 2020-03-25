#!/bin/sh

chromium=/Applications/Chromium.app/Contents/MacOS/Chromium

if [ ! -f "${chromium}" ]; then
    echo ""
    echo "Chromium not found at ${chromium}"
    echo ""
    echo "Download at https://download-chromium.appspot.com/"
    echo "or install with brew: brew cask install chromium"
    echo ""
    exit 1
fi

$chromium --no-sandbox --enable-automation --remote-debugging-port=9922 &
