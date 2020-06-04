/* eslint-disable camelcase */
'use strict';

const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const mongoose = require('mongoose');
const helpers = require('../helpers');

const options = {
  webHook: {
    port: process.env.PORT,
  },
};

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, {
  useMongoClient: true,
});

const bot = new TelegramBot(process.env.TOKEN, options);
bot.setWebHook(`${process.env.APP_URL}/bot${process.env.TOKEN}`);


bot.onText(/\/curse/, msg => {
  const fromId = helpers.getFromId(msg);

  bot.sendMessage(fromId, 'Яка валюта вас цікавить?', {
    reply_markup: {
      inline_keyboard: [
        [{
          text: '€ - EUR',
          callback_data: 'EUR',
        },
        {
          text: '$ - USD',
          callback_data: 'USD',
        },
        {
          text: '₿ - BTC',
          callback_data: 'BTC',
        },
        {
          text: '₽ - RUR',
          callback_data: 'RUR',
        },

        ],
      ],
    },
  });
});

bot.on('callback_query', query => {
  const id = query.message.chat.id;

  request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
    (error, response, body) => {
      if (error) throw error;

      const data = JSON.parse(body);
      const result = data.filter(item => item.ccy === query.data)[0];
      const flag = {
        'EUR': '🇪🇺',
        'USD': '🇺🇸',
        'RUR': '🇷🇺',
        'BTC': '₿',
        'UAH': '🇺🇦',
      };
      const md = `
      *${flag[result.ccy]} ${result.ccy} 💱 ${result.base_ccy} ${flag[result.base_ccy]}*
      Buy:  ${result.buy}
      Sale: ${result.sale}
    `;
      bot.answerCallbackQuery(query.id, `${flag[result.ccy]}`);
      bot.sendMessage(id, md, { parse_mode: 'Markdown' });

    },
  );
});

bot.onText(/\/key/, msg => {
  const fromId = helpers.getFromId(msg);
  bot.sendMessage(fromId, 'Клавіатура', {
    reply_markup: {
      keyboard: [
        [{
          text: 'Location',
          request_location: true,
        }],
        [{
          text: 'My phone number',
          request_contact: true,
        },
        ],
      ],
      one_time_keyboard: true,
    },
  });

});
