# Description

1. Setup github self-hosted runner & DigitalOcean droplet:

https://codememoirs.com/automatic-deployment-digitalocean-github-actions

2. To run applications, you need to run these commands once on the server relative to folder:

`~/actions-runner/_work/angular-community-ua-backend/angular-community-ua-backend`

### Apps [PRODUCTION]

```
PORT=3000 PROD=true pm2 start -i 0 ./dist/apps/main/main.js --name acua-main

PORT=3001 PROD=true pm2 start -i 0 ./dist/apps/code-review/main.js --name acua-code-review

PORT=3002 PROD=true pm2 start -i 0 ./dist/apps/telegram-bot/main.js --name acua-telegram-bot
```

### Apps [DEVELOPMENT]

```
PORT=4000 PROD=false pm2 start -i 0 ./dist/apps/main/main.js --name dev-acua-main

PORT=4001 PROD=false pm2 start -i 0 ./dist/apps/code-review/main.js --name dev-acua-code-review

PORT=4002 PROD=false pm2 start -i 0 ./dist/apps/telegram-bot/main.js --name dev-acua-telegram-bot
```

Each application will read "PORT" from `process.env.PORT` field to bootstrap itself.

### Github workflow

Scripts at:
`.github/workflows` will run commands at self-hosted runner.

After Github Actions triggering yml file will run commands to restart apps via *pm2*, example:

```
pm2 restart acua-main
```

Where `acua-main` is name of the app.

Depending on workflow script will be restarted apps of *prod* or *dev* environment.
