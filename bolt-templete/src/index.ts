const { App } = require('@slack/bolt')

import { config } from 'dotenv'

config()
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: '/events',
})

app.event('app_home_opened')

app.action('test', async ({ ack }) => {
  console.log('test action')
  await ack()
})

app.message('hello', async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`)
})
;(async () => {
  await app.start(8888)
  console.log('⚡️ Bolt app is running!')
})()
