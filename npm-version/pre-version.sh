#!/usr/bin/env bash -e

git fetch --tags

# create temp branch
git checkout -b release/temp_$(git rev-parse --short HEAD)

# TODO Add changelog via ezchanglog
# changelog
# git add CHANGELOG.md
