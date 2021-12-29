import { Home, Button, Mrkdwn, Actions, Section, JSXSlack } from 'jsx-slack'
export const openAppHomeEvent = async ({ event, client }) => {
  try {
    await client.views.publish({
      view: JSXSlack(
        <Home>
          <Section>
            <Mrkdwn>*Welcome test*</Mrkdwn>
          </Section>

          <Actions>
            <Button actionId="test" style="primary">
              Test
            </Button>
          </Actions>
        </Home>
      ),
      user_id: event.user,
    })
  } catch (error) {
    console.error(error)
  }
}
