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
      bot.answerCallbackQuery(query.id, `${flag[result.ccy]}`);
      bot.sendMessage(id, md, {parse_mode: 'Markdown'});
      
    }
    );
  })