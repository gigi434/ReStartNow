FROM mcr.microsoft.com/devcontainers/typescript-node:20-bullseye

ENV HOME=/home/node
ENV APP_HOME="$HOME/workspace"

WORKDIR $APP_HOME

RUN npx -y playwright@1.44.1 install --with-deps

USER node