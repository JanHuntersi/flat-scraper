
# Final image for running the compiled code
FROM node:16-alpine

WORKDIR /scraper

COPY package*.json ./

RUN npm install --only=production

COPY --from=build /scraper/dist ./dist

CMD ["npm", "run", "scrape"]
