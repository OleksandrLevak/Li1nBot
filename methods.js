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


bot.on('inline_query', query => {

  results = [
    {
      type: "photo",
      id : "1",
      photo_url :"https://img.anews.com/media/posts/images/20200409/127396227tw.jpg",
      thumb_url :"https://img.anews.com/media/posts/images/20200409/127396227tw.jpg",
      title : "TestTitle",
      photo_width: 70,
      photo_height: 40
   },
   {
    type: "photo",
    id : "2",
    photo_url :"https://cs8.pikabu.ru/post_img/2017/06/20/8/1497966721191420192.jpg",
    thumb_url :"https://cs8.pikabu.ru/post_img/2017/06/20/8/1497966721191420192.jpg",
    title : "TestTitle2",
    photo_width: 40,
    photo_height: 40
 },
 {
  type: "photo",
  id : "3",
  photo_url :"https://cs9.pikabu.ru/post_img/2017/04/02/8/149113711118483729.jpg",
  thumb_url :"https://cs9.pikabu.ru/post_img/2017/04/02/8/149113711118483729.jpg",
  title : "TestTitle3",
  photo_width: 50,
  photo_height: 40
},

{
  type: "photo",
  id : "4",
  photo_url :"https://cs10.pikabu.ru/post_img/big/2018/06/08/10/1528473855169978071.jpg",
  thumb_url :"https://cs10.pikabu.ru/post_img/big/2018/06/08/10/1528473855169978071.jpg",
  title : "TestTitle3",
  photo_width: 40,
  photo_height: 70
}


  ]

  bot.answerInlineQuery(query.id, results, {
    cache_time: 0
  })
})

bot.onText(/\/location/, function (msg) {
  var fromId = msg.from.id;
  bot.sendLocation(fromId, 50.757301, 25.353646);
});

bot.onText(/\/contact/, function (msg) {
  var fromId = msg.from.id;
  bot.sendContact(fromId, '+380505437300', 'Валентина', {
    last_name: 'Стрелюк'
  });
});

bot.onText(/\/clothe/, function (msg) {

  var fromId = msg.from.id;
  bot.sendPhoto(fromId, './one.jpg', {
    caption: `
Сукні
Виробник: Туреччина
Ціна: 2300 грн.
Розмір: 54 - 60`
  });
});

bot.onText(/\/pay/, function (msg) {
var fromId = msg.from.id;
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
 amount: 388000
}
],
{
photo_url: "https://24tv.ua/resources/photos/news/201907/1177675.jpg?1562772860000",
need_name: true,
need_email: true,
}

);
});

bot.onText(/\/json/, function (msg) {

  const html = `
<strong>Hello, ${msg.from.first_name}</strong>

<pre>${debug(msg)}</pre>
`;
         var fromId = msg.from.id;
         bot.sendMessage(fromId, html, {parse_mode: 'HTML'});
});