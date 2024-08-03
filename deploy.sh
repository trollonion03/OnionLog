#!/bin/sh
current_date=$(date +"%y%m%d")
pwd
npm run build || exit 1
cp -rfv ./build/* /home/ubuntu/trollonion03.github.io/ || exit 1
cd /home/ubuntu/trollonion03.github.io/ || exit 1
pwd
git pull || exit 1
git add . || exit 1
git commit -m "[Build] khe - $current_date build" || exit 1
git push || exit 1