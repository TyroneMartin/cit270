FROM node:alpine

COPY package.json ./

COPY server.js ./

# installs the current package
RUN rpm installs

EXPOSE 3000

# this happens 
CMD ["node", "server.js"]