// PM2 process file — used if Hostinger's Node.js app manager exposes an
// "entry point" that runs `pm2 start ecosystem.config.js`, or if this ever
// moves to a VPS where PM2 is set up by hand. Hostinger's hPanel "Node.js"
// app screen otherwise just needs the startup file set to node_modules/.bin/next
// with args "start" — see DEPLOYMENT.md.
module.exports = {
  apps: [
    {
      name: "varaaai",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
