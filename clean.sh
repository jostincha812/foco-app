#!/bin/bash
rm -rf ./node_modules
rm -rf $TMPDIR/react-*
npm install
sudo chmod -R 777 node_modules
npm start -- --reset-cache
