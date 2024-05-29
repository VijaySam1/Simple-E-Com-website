export NODE_ENV=development
export TZ=Etc/UTC

export HOST=0.0.0.0
export PORT=4300


#node dist/index.js
yarn rebuild && yarn start:watch
