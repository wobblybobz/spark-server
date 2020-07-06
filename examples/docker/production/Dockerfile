
#
# Local Cloud Sparc-Server  
#

#
# based on Alpine Node (version 8 is tested, other Version should work as well)
#
FROM mhart/alpine-node:12


# create the Working Directory
RUN mkdir -p /usr/src/localCloud

# install all dependencies and delete them in ONE single RUN
# you can split this into different steps, but this will make the Image MUCH larger!
RUN apk add --no-cache git; \
    cd /usr/src/localCloud; \
    git clone https://github.com/wobblybobz/spark-server.git; \
    cd  /usr/src/localCloud/spark-server; \
    rm -rf .git; \
    yarn install; \
    apk del git; \
    yarn run prebuild; \
    yarn run build

# Set Working Directory
WORKDIR /usr/src/localCloud/spark-server


# Expose SparkPort to be mapped
EXPOSE 5683

# Expose ServerPort for API
EXPOSE 8080

# Expose DataDirectory to store DB and Device Keys 
VOLUME /usr/src/localCloud/spark-server/data

ENTRYPOINT ["yarn", "run", "start:prod"]



