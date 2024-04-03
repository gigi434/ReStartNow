FROM mcr.microsoft.com/devcontainers/typescript-node:20-bullseye

ENV HOME=/home/node
ENV APP_HOME="$HOME/workspace"

WORKDIR $APP_HOME

# 共有ディレクトリの権限をnodeで777に設定する
RUN chown -R node:node ${APP_HOME}

# ユーザーをrootからnodeへ変更する
USER node