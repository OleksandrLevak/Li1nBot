const TOKEN = process.env.TELEGRAM_TOKEN || '1013712671:AAF0AzZ0zGawEY6X11SkGfXU5C_S70ld6lI';
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const options = {
  webHook: {
    port: process.env.PORT
  }
};

const url = process.env.APP_URL || 'https://li1n-bot.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);
bot.setWebHook(`${url}/bot${TOKEN}`);




bot.onText('hello', function (msg) {  
    bot.sendMessage(msg.from.id, `Hello ${from.first_name}`);
});


bot.onText(/\/curse/, function (msg) {
  var fromId = msg.from.id; // Получаем ID отправителя
      
       bot.sendMessage(fromId, 'Яка валюта вас цікавить?', {
         reply_markup: {
           inline_keyboard: [
             [
               {
                 text: '€ - EUR',
                 callback_data: 'EUR'
               },
               {
                text: '$ - USD',
                callback_data: 'USD'
              },
              {
                text: '₿ - BTC',
                callback_data: 'BTC'
              },
              {
                text: '₽ - RUR',
                callback_data: 'RUR'
              },

             ]
           ]
         }
       });
});

bot.on('callback_query', query => {
  const id = query.message.chat.id;

  request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', 
  function(error, response, body){
    const data = JSON.parse(body);
    const result = data.filter(item => item.ccy === query.data)[0];
    const flag = {
      'EUR': '🇪🇺',
      'USD': '🇺🇸',
      'RUR': '🇷🇺',
      'BTC': '₿',
      'UAH': '🇺🇦',
    }
    let md = `
      *${flag[result.ccy]} ${result.ccy} 💱 ${result.base_ccy} ${flag[result.base_ccy]}*

      Buy:  ${result.buy}
      Sale: ${result.sale}
    `;
    bot.sendMessage(id, md, {parse_mode: 'Markdown'});
  }
  );
})


