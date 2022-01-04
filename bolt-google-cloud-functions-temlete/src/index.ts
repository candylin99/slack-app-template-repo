import { App, LogLevel } from '@slack/bolt'

import { config } from 'dotenv'

config()

const handleEvent = async () => {
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    logLevel: LogLevel.DEBUG,
  })

  const submitter = await app.client.users.lookupByEmail({
    token: process.env.SLACK_BOT_TOKEN,
    email: 'xx@xx.com',
  })
  const submitterId = submitter.user.id

  try {
    app.client.chat.postMessage({
      channel: submitterId,
      text: `Welcome to the team, <@${submitterId}>! 🎉 You can introduce yourself in this channel.`,
    })
  } catch (err) {
    console.error(err, 'err')
  }
}

export { handleEvent }
