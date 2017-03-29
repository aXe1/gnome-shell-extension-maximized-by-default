#!/bin/sh

rm -rf dist
mkdir -p dist
zip -j9 dist/gnome-shell-extension-maximized-by-default.zip src/*
