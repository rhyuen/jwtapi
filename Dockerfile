FROM mhart/alpine-node:6
MAINTAINER rhyuen
WORKDIR /src
COPY package.json /src/package.json
RUN npm install
COPY . /src/.
EXPOSE 9899
CMD ["npm", "start"]
