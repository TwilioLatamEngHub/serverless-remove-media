<h1 align="center">Remove Media Attachments on Conversations</h1>

## Disclaimer

**This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Twilio bears no responsibility to support the use or implementation of this software.**

## Use Case

[Conversations on Flex](https://www.twilio.com/docs/flex/conversations) allows customers/agents to send media attachments to each other while having a conversation (chat, WhatsApp and SMS). This code removes this capability so messages will only be text-based.

This also works if you are using the [Conversations API](https://www.twilio.com/docs/conversations) without Flex.

![](remove-media.gif)

## Brief Explanation on How This is Done

Conversations sends pre-action and post-action webhooks for most events that happen in your application. These webhooks allow you to monitor and intercept user actions in your own backend service, in a Function (which is our case here), or in a Studio flow. [Read more about Conversations Webhooks here](https://www.twilio.com/docs/conversations/conversations-webhooks).

For our especific case, we need to use the [Post Action Webhook](https://www.twilio.com/docs/conversations/conversations-webhooks#post-action-webhooks), since we need the `MessageSid` which will only arrive in the post-webhook.

So in the Twilio Console, inside your Conversation Service under Webhooks, we'll need to add the Webhook Target (in our case the URL of our Twilio Function as a post-event URL) and the Webhook Filtering (in our case we'll use the Post-webhook `onMessageAdded` [Webhook Action Trigger](https://www.twilio.com/docs/conversations/conversations-webhooks#onmessageadded), which will fire when a new message is posted to the conversation).

With this, our `remove-media.js` function will simply check if there is `Media`, and if so, "replaces" that media message with a new message "Message with attachment removed". To be more especific, it actually [deletes the message](https://www.twilio.com/docs/conversations/api/conversation-message-resource#delete-a-conversationmessage-resource) and right after [creates a message](https://www.twilio.com/docs/conversations/api/conversation-message-resource#create-a-conversationmessage-resource).

## Twilio Serverless Functions

This sample code uses Twilio Serverless Functions. [Check it out our Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started), otherwise feel free to use the code here in your own backend service.

## Setup

1. Make a `.env` according to the `.env.example` and add your Twilio Account Sid and Auth Token.

2. Run `twilio serverless:deploy`

3. Add the newly created function URL in Twilio's Console as stated in the explanation above.
