const TOKEN = process.env.TELEGRAM_TOKEN || '1013712671:AAF0AzZ0zGawEY6X11SkGfXU5C_S70ld6lI';
const TelegramBot = require('node-telegram-bot-api');
const options = {
  webHook: {
    port: process.env.PORT
  }
};

const url = process.env.APP_URL || 'https://li1n-bot.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);
bot.setWebHook(`${url}/bot${TOKEN}`);


var counter = [];

bot.onText(/(^[0-9]+)/, function (msg, match) {
    var fromId = msg.from.id; // Получаем ID отправителя
    var resp = match[1];
    let pars = parseInt(resp);
    counter.push(pars);
    bot.deleteMessage(fromId, msg.message_id);
});

bot.onText(/res/, function (msg) {
    var fromId = msg.from.id; // Получаем ID отправителя
        var result = counter.reduce(function(sum, current) {
            return sum + current
         });
    bot.sendMessage(fromId, 'Всього віджався: ' + result);
});

var notes = [];

bot.onText(/remaind me (.+) в (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];

    notes.push({ 'uid': userId, 'time': time, 'text': text });

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
});

setInterval(function(){
    for (var i = 0; i < notes.length; i++) {
    const curDate = new Date().getHours() + ':' + new Date().getMinutes();
    if (notes[i]['time'] === curDate) {
      bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
      notes.splice(i, 1);
    }
  }
}, 1000);


