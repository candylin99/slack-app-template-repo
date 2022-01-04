import { App, LogLevel } from '@slack/bolt'
import { ConfigCenter } from '@aftership/config-center-sdk'
import { config } from 'dotenv'

config()
let configCenter
const handleEvent = async () => {
  const config_center = new ConfigCenter()
  configCenter = await config_center.init()

  const app = new App({
    token: configCenter['slack.bot-token'],
    appToken: configCenter['slack.app-token'],
    signingSecret: configCenter['slack.signing-secret'],
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
