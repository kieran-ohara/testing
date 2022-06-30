FROM public.ecr.aws/lambda/nodejs:14 as build

WORKDIR /build

COPY package.json  .
COPY package-lock.json .

RUN npm ci --force

COPY . .

RUN npm run build:client && npm run build:server

FROM public.ecr.aws/lambda/nodejs:14
# FROM node:alpine

ENV NODE_ENV=production

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=build /build/package.json .
COPY --from=build /build/package-lock.json .
RUN npm ci --production --force

COPY --from=build /build/dist dist
COPY --from=build /build/index.html index.html
COPY --from=build /build/index.js index.js
COPY --from=build /build/server.js server.js
COPY --from=build /build/serverless.js serverless.js
COPY --from=build /build/src src

CMD [ "serverless.handler" ]
