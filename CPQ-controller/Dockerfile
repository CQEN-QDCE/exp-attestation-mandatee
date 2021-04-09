FROM registry.redhat.io/ubi8/nodejs-12 as builder
USER 1000
WORKDIR /opt/app-root/src
ENV PATH /opt/app-root/src/node_modules/.bin:$PATH
COPY package.json /opt/app-root/src
RUN npm install
RUN npm install react-scripts@3.4.1 -g
COPY public /opt/app-root/src/public/
COPY src /opt/app-root/src/src/
RUN npm run build
COPY server.js /opt/app-root/src/

EXPOSE 15000

CMD ["npm", "start"]