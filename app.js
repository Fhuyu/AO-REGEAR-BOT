// const webshot = require('webshot') //https://www.npmjs.com/package/webshot-node
var fs = require('fs')

const Discord = require('discord.js')
const bot = new Discord.Client()

const auth = require("./auth")
const token = auth.token

const PREFIX = '!'

const puppeteer = require('puppeteer');

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
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setViewport({ width: 1920, height: 1280 }) 
              
                await page.goto('https://albiononline.com/en/killboard/kill/103773175');
                await page.waitForSelector(".end .item-list__body .item--MainHand img")
                setTimeout(async () => { 
                  await page.screenshot({
                      path: 'example.png',
                  //   fullPage: false,
                      clip: {
                          x: 1060,
                          y: 490,
                          width: 430,
                          height: 550
                      }
                  });
                  await browser.close();
                    message.channel.send(exampleEmbed);
                    message.channel.send('pong!', {files : ["./example.png"]}) // NO TAG
                    // fs.unlink('example.png')
                    setTimeout(async () => { 
                        fs.unlink('example.png', (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log("File is deleted.");
                        });
                    }, 2000)
                  }, 5000)
              })();
                bot.channels.cache.get('737744651498291308').send('Hello here!') // CHOOSE CHANNEL + NO TAG
                
            break;
    }

})

bot.login(token)
