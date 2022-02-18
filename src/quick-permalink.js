const getContextualView = (e) => {
  const messageAccessToken = e.messageMetadata.accessToken
  const messageID = e.messageMetadata.messageId
  
  GmailApp.setCurrentMessageAccessToken(messageAccessToken)

  const message = GmailApp.getMessageById(messageID)
  const thread = message.getThread()
  const permalink = thread.getPermalink()
    
  return getPermalinkCard({permalink})
}

const getPermalinkCard = ({permalink}) => CardService.newCardBuilder()
  // .setHeader(CardService.newCardHeader()
  //   .setTitle('Useful information about this email'))
  .addSection(CardService.newCardSection()
    .addWidget(CardService.newTextInput()
      .setFieldName('gmail-message-thread-permalink')
      .setTitle(`Permalink to email (won't load full interface)`)
      .setValue(permalink)
      .setMultiline(true))
    .addWidget(CardService.newTextButton()
      .setText('Open email')
      .setOpenLink(CardService.newOpenLink()
      .setUrl(permalink)
      .setOpenAs(CardService.OpenAs.OVERLAY))))
  .build()
