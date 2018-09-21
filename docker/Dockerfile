FROM node:10.10.0

ENV HOME=/home/u2f_server
ENV NODE_ENV=production

RUN useradd --user-group --create-home u2f_server

USER $APP_USER
WORKDIR $HOME/app

COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
COPY package.json package.json

RUN cd /tmp && npm i \
  && mkdir -p $HOME/app \
  && cd $HOME/app \
  && ln -s /tmp/node_modules

COPY database database

COPY tsconfig.json .
COPY tslint.json .
COPY knexfile.js .
COPY gulpfile.ts .
COPY docker/entrypoint.sh ./docker/entrypoint.sh

VOLUME /var/logs/u2f_server/

EXPOSE 8443
ENTRYPOINT ["docker/entrypoint.sh"]
CMD npm run start-js

COPY src src

RUN node_modules/.bin/tsc \
  && chown -R u2f_server:u2f_server $HOME/*

