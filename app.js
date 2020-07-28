// const webshot = require('webshot') //https://www.npmjs.com/package/webshot-node
// var fs = require('fs')

const Discord = require('discord.js')
const bot = new Discord.Client()

const auth = require("./auth")
const token = auth.token

const PREFIX = '!'

var options = {
    captureSelector : ".item-list__body.item-list__body--gear",
    delay: 30,
//     screenSize: {
//       width: 320
//     , height: 480
//     }
//   , shotSize: {
//       width: 320
//     , height: 'all'
//     }
//   , userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
//       + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
  };

var webshot = require('webshot-node');
// webshot('google.com', 'google.png', function(err) {
//     if(!err) {
//             console.log('Screenshot taken!')
//         }
// });
var fs      = require('fs');
let fileName = 'google.png'


const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');


bot.on('ready', () => {
    console.log('Bot is online!')
})

bot.on('message', message => {

    if(message.content === "HELLO") {
        message.reply('HELLO FRIEND') // TAG THE PERSON
    }

    let args = message.content.substring(PREFIX.length).split(" ")

    switch(args[0]) {
        case 'ping':
            webshot('google.com', 'google.png',  (err) => { /* , selector = ".item-list__body", delay = 0.5 */
                bot.channels.cache.get('737744651498291308').send('Hello here!') // CHOOSE CHANNEL + NO TAG
                message.channel.send('pong!', {files : ["./google.png"]}) // NO TAG
                message.channel.send(exampleEmbed);
            })
            // fs.readFile(`google.png`, (err, data)=>{
            //     if(!err) {
            //         message.channel.send('pong!', {files : ["./google.png"]}) // NO TAG
            //     }
            // })
            break;
    }

})

bot.login(token)
