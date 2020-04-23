
setTimeout(() => {
    bot.sendMessage(fromId,
      'https://docs.google.com/spreadsheets/d/10FMNX9eli5hQMcsf6S9egT-n8gw_1bt4NLaXYDz2z9k/edit#gid=0',
     {disable_web_page_preview: true,
     disable_notification: true});
  }, 5000);