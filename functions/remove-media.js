const path = Runtime.getFunctions()['response-header'].path
const response = require(path).response()

exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient()

  const { Media, ConversationSid, MessageSid, Author } = event

  if (Media && Author.includes('whatsapp:')) {
    await client.conversations.v1
      .conversations(ConversationSid)
      .messages(MessageSid)
      .remove()
      .then(async () => {
        await client.conversations.v1
          .conversations(ConversationSid)
          .messages.create({ body: 'Mensagem com anexo removida' })
          .then(message => console.log(message.sid))
      })
      .then(() => callback(null, response))
      .catch(err => {
        console.log(err)
        return callback(err)
      })
  }

  return callback(null, response)
}
