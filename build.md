```bash
docker buildx build . --target api --tag discordx-api:latest --no-cache
docker buildx build . --target bot --tag discordx-bot:latest --no-cache
docker buildx build . --target web --tag discordx-web:latest --no-cache
```
