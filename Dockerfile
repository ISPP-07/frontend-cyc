FROM node:21.7.3-alpine3.18

# Create app directory
WORKDIR /frontend_cyc

# Install app dependencies
COPY package.json ./

RUN npm install -g pnpm@8.15
RUN pnpm install

# Bundle app source
COPY src ./src
COPY public ./public
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY transformerCSS.js ./
COPY babel.config.js ./
COPY next.config.mjs ./
COPY jsconfig.json ./

# Build project
RUN pnpm build
