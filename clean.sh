#!/bin/bash
rm -rf ./node_modules
rm -rf $TMPDIR/react-*
npm install
chmod -R 777 node_modules
# cd ios || pod install || cd ..
npm start -- --reset-cache
