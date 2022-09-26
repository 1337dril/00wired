# ------------> build react-app
FROM node AS react-build
WORKDIR /usr/src
COPY ./client/ ./client/
RUN cd client && npm install && npm run build



# ------------> build server

FROM node:18-alpine
RUN apk add dumb-init
WORKDIR /usr/src/app

COPY --chown=node:node ./server/package*.json .

RUN npm install

COPY --chown=node:node ./server .

COPY --chown=node:node --from=react-build /usr/src/client/dist ./dist/build

ENV NODE_ENV production

RUN npm run build


EXPOSE $PORT

USER node

CMD ["dumb-init", "node", "dist/index.js"]