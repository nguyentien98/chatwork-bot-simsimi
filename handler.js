const fetch = require("node-fetch");
const chatwork = require("./services/chatwork");

module.exports = {
  bot: (event, context, callback) => {
    let body = JSON.parse(event.body);
    let message = body.webhook_event;

    let fromUser = message.from_account_id;
    let roomId = message.room_id;

    if (roomId != "128606464") {
      return;
    }

    let mentionMess = message.body;
    mentionMess = mentionMess.substr(mentionMess.indexOf("\n") + 1, 50);
    mentionMess = encodeURI(mentionMess);
    console.log(mentionMess.indexOf(encodeURI("thời tiết")));
    if (mentionMess.indexOf(encodeURI("thời tiết")) != -1) {
      fetch(`https://api.openweathermap.org/data/2.5/find?q=Hanoi&units=metric&appid=d8e9bfa86f552bf4fabdbfa0ec3cf020`)
      .then(async weather => {

        let receivedMess = await weather.json();
        let message = `[To:${fromUser}] \n ${receivedMess.list[0].main.temp} độ đó`;
        message = encodeURI(message);
  
        chatwork(roomId, message);
      });

      return;
    }

    if (mentionMess.indexOf(encodeURI("{tat} cc:")) != -1) {
      mentionMess = mentionMess.substr(mentionMess.indexOf(encodeURI("{tat} cc:")) + encodeURI("{tat} cc:").length);
      let message = `(tat) (tat2) (tat3) (tat4) (tat5) (tat6) (tat7) (tat8) ${mentionMess}`;
      return chatwork(roomId, message);
    }

    fetch(`http://api.minhhieu.asia/vi.php?text=${mentionMess}`)
    .then(async simsimi => {
      let receivedMess = await simsimi.text();
      let sendMessage = "";
      sendMessage = `[To:${fromUser}] ${receivedMess}`;
      sendMessage = encodeURI(sendMessage);
      return chatwork(roomId, message);
    });
  }
}