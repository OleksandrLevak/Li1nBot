  bot.onText(/ДС/, function (msg) {
    var fromId = msg.from.id; 
    setTimeout(() => {
        bot.sendMessage(fromId,
          'https://docs.google.com/spreadsheets/d/10FMNX9eli5hQMcsf6S9egT-n8gw_1bt4NLaXYDz2z9k/edit#gid=0',
         {disable_web_page_preview: true,
         disable_notification: true});
      }, 5000);

});


bot.onText(/\/key/, function (msg) {
  var fromId = msg.from.id; 
    bot.sendMessage(fromId, 'Клавіатура', {
    reply_markup: {
      keyboard: [
        [{
          text: 'Location',
          request_location: true
        },
        {
          text: 'My phone number',
          request_contact: true
        }],
      ],
      one_time_keyboard: true
    },
  });

});