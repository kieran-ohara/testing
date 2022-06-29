FROM public.ecr.aws/lambda/nodejs:14 as build

WORKDIR /build

COPY package.json  .
COPY package-lock.json .

RUN npm ci --force

COPY . .

RUN npm run build:client && npm run build:server

FROM public.ecr.aws/lambda/nodejs:14

ENV NODE_ENV=prod

COPY --from=build /build/package.json ${LAMBDA_TASK_ROOT}
COPY --from=build /build/package-lock.json ${LAMBDA_TASK_ROOT}
RUN npm ci --production --force

COPY --from=build /build/index.js ${LAMBDA_TASK_ROOT}
COPY --from=build /build/server.js ${LAMBDA_TASK_ROOT}
COPY --from=build /build/serverless.js ${LAMBDA_TASK_ROOT}
COPY --from=build /build/dist ${LAMBDA_TASK_ROOT}

CMD [ "serverless.handler" ]
