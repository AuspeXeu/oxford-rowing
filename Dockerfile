FROM node:15-alpine
LABEL maintainer="Christian Vaas <chrisvaas@gmail.com>"
RUN apk add --no-cache make gcc g++ python bash nano
WORKDIR /usr/app
ADD . .
RUN yarn && yarn build
ENV NODE_ENV=production

EXPOSE 3019

CMD ["node", "/usr/app/server.js"]
