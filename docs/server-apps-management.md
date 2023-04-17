# Description

1. Setup github self-hosted runner & DigitalOcean droplet:

https://codememoirs.com/automatic-deployment-digitalocean-github-actions

2. To run applications, you need to run these commands once on the server relative to folder:

`~/actions-runner/_work/angular-community-ua-backend/angular-community-ua-backend`

### Run process on the server

```
pm2 start -i 0 ./dist/apps/main/main.js --name dev-acua-main
```

### Github workflow

Scripts at:
`.github/workflows` will run commands at self-hosted runner.

After Github Actions triggering yml file will run commands to restart apps via *pm2*, example:

```
pm2 restart dev-acua-main
```

Where `dev-acua-main` is name of the app.

Depending on workflow script will be restarted apps of *prod* or *dev* environment.

### SSL

Згенерував сертифікат тут:

https://manage.sslforfree.com

Після чого, на сервері закинув його в root/cert.
В yml конфігу для CD прописані команди копіювання сертифікату в проєкти.
В проєктах, коли ENV VAR PROD=TRUE - читається сертифікат для проєктів.
