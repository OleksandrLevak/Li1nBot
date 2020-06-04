'use strict';

bot.onText(/ДС/, msg => {
  const fromId = msg.from.id;
  setTimeout(() => {
    bot.sendMessage(fromId,
      'https://docs.google.com/spreadsheets/d/10FMNX9eli5hQMcsf6S9egT-n8gw_1bt4NLaXYDz2z9k/edit#gid=0',
      { disable_web_page_preview: true,
        disable_notification: true });
  }, 5000);

});


bot.onText(/\/pay/, msg => {
  const fromId = msg.from.id;
  bot.sendInvoice(
    fromId,
    'Apple AirPods 2',
    `- ОРИГИНАЛЬНЫЕ Apple AirPods 
- ГАРАНТИЯ 1 ГОД
- ЗАВОДСКАЯ УПАКОВКА`,
    'payload',
    '632593626:TEST:i56982357197',
    'RANDOM_KEY',
    'UAH',
    [
      {
        label: 'airpods',
        amount: 388000,
      },
    ],
    {
      photo_url: 'https://24tv.ua/resources/photos/news/201907/1177675.jpg?1562772860000',
      need_name: true,
      need_email: true,
    },

  );
});

bot.onText(/\/json/, msg => {

  const html = `
<strong>Hello, ${msg.from.first_name}</strong>
<pre>${debug(msg)}</pre>
`;
  const fromId = msg.from.id;
  bot.sendMessage(fromId, html, { parse_mode: 'HTML' });
});
