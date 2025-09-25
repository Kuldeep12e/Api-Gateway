FROM node:20

WORKDIR /developer

RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/Kuldeep12e/Api-Gateway.git

WORKDIR /developer/Api-Gateway

RUN npm ci

ENV PORT=3001

EXPOSE 3001

CMD ["npm", "run", "dev"]
