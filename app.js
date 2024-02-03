const express = require('express');
const app = express();

const line = require('@line/bot-sdk');
require('dotenv').config();

const config = {
    channelAccessToken: process.env.token,
    channelSecret: process.env.secretcode
}

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all([
            req.body.events.map(handleEvents)
        ])
        .then((result) => res.json(result))
});

const client = new line.Client(config);

function handleEvents(event) {
    //  if(event.type !== 'message' || event.type !== 'text'){
    //      return Promise.resolve(null)
    //  }
        
    if(event.type == 'message') {
        return client.replyMessage(event.replyToken,[{
       
            "type": "flex",
            "altText": "This is a Flex Message",
            "contents": {
        "type": "bubble",
        "hero": {
          "type": "image",
           "url": "https://media.discordapp.net/attachments/798084755861667840/1202829560631132180/IMG_2628.jpg?ex=65cee152&is=65bc6c52&hm=914ab8ee13bee9c986bc243249dc4bb74a75bd8a22342da71303e00afaca35f9&",
          "size": "full",
          "backgroundColor": "#0367D3"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "🚨Emergency  Boardcast📌",
              "size": "lg",
              "margin": "xs",
              "style": "italic",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "รายงานเหตุ - ขนส่งมวลชน",
              "margin": "xs",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "รายงาน - รถไฟฟ้าสายสีชมพูขัดข้อง",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "ให้บริการแบบshuttle",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "สถานที่เกิดเหตุ "
            },
            {
              "type": "text",
              "text": "สถานี ศูนย์ราชการนนทบุรี(PK01)"
            },
            {
            "type" : "text",
            "text" : "ถึง สถานี กรมชนประทาน (PK05)"
            }
                ]
              }
            }
          }
     
     ])
    }else{
        return Promise.resolve(null)
    }
    
     

}
app.get('/',(req,res) =>{
        res.send('it-work');
})
app.listen(3000, () => console.log('start server on port 3000'))