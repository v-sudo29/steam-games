#!/usr/bin/env bash
# exit on errorset -o errexit
# source: https://community.render.com/t/error-could-not-found-chromium/9848/2
npm install
# npm run build # uncomment if required

# Store/pull Puppeteer cache with build cache
if [ ! -d $PUPPETEER_CACHE_DIR ] ; then 
  echo "...Copying Puppeteer Cache from Build Cache" 
  cp -R $XDG_CACHE_HOME/puppeteer/ $PUPPETEER_CACHE_DIR
else 
  echo "...Storing Puppeteer Cache in Build Cache" 
  cp -R $PUPPETEER_CACHE_DIR $XDG_CACHE_HOME
fi