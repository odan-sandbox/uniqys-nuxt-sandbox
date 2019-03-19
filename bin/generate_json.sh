#!/bin/bash

set -eu

cat uniqys.template.json | sed "s/\$PORT/$PORT/" > uniqys.json