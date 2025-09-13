FROM node:24-alpine3.21
COPY . /client
RUN chmod -R 700 /client
RUN adduser -D shopp_client
RUN chown -R shopp_client:shopp_client /client
USER shopp_client
WORKDIR /client
RUN npm install
CMD ["npm", "run", "dev"]
