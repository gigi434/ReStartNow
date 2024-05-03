FROM mcr.microsoft.com/devcontainers/typescript-node:20-bullseye

ENV HOME=/home/node
ENV APP_HOME="$HOME/nestjs"

WORKDIR $APP_HOME

# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#global-npm-dependencies
# npmのグローバル設定
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# NestJSをインストール時にgitが必要なためインストールする
RUN apt-get update \
    && apt-get install -y git \
    && npm i -g @nestjs/cli \
    && npm i -g prisma \
    && apt-get install -y procps

# ディレクトリの保有者をnodeに変更する
RUN chown -R node:node ${HOME}

# ユーザーをrootからnodeへ変更する
USER node