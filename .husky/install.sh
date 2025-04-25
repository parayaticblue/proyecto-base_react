#!/bin/sh
if [ ! -d ".husky" ]; then
  npx husky install
fi 