module.exports = {
  apps: [
    {
      name: "api",
      script: "app.js",
      watch: true,
      exec_mode: "cluster",
      max_memory_restart: "1000M",
      instances: 1,
      cron_restart: "59 23 * * *",
    },
  ],
};
