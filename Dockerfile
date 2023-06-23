FROM node:alpine
WORKDIR /usr/app

COPY package.json /usr/app

COPY server.js /usr/app

# installs the current package
RUN rpm installs

EXPOSE 3000

# this happens 
CMD ["node", "server.js"]