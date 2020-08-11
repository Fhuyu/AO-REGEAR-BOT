// const webshot = require('webshot') //https://www.npmjs.com/package/webshot-node
var fs = require('fs')
const axios = require('axios');

const Discord = require('discord.js')
const bot = new Discord.Client()

const auth = require("./auth")
const token = auth.token

const PREFIX = '!'

const puppeteer = require('puppeteer');

bot.on('ready', () => {
    console.log('Bot is online!')
    bot.channels.cache.get('737744651498291308').send(`Hello, I'm Emi, Money Guild regear assistance.
Send me a **private message** to begin a regear request (**!deaths** *IGN*)
Type **!info** or **!help** for more informations.`);
})
//737744651498291308 FUYU
//737024926057365504 MG

bot.on('message', message => {

    if(message.content === "HELLO") {
        message.reply('HELLO FRIEND') // TAG THE PERSON
    }

    let args = message.content.substring(PREFIX.length).split(" ")

    switch(args[0]) {
        case 'deaths':
            (async () => {
                await axios.get('https://gameinfo.albiononline.com/api/gameinfo/search?q=Fuyuh')
                .then( async (response) => {
                    let playerData = response.data.players
                    bot.channels.cache.get('737744651498291308').send(`IGN : ${playerData[0].Name}
Guild : ${playerData[0].GuildName}
Your current PVP Fameratio is ${playerData[0].FameRatio}
Looking for your deaths ...`)
                    await axios.get('https://gameinfo.albiononline.com/api/gameinfo/players/lC75WrGoR5mz5iEImipTqw/deaths')
                    .then( response => {
                        // console.log(response.data[0])
                        let battles = []
                        response.data.forEach( battle => {
                            let bat = {name : `ID : ${battle.EventId}`, value: `Date : ${new Date(battle.TimeStamp).toUTCString()}
Killer (Guild) : ${battle.Killer.Name} (${battle.Killer.GuildName})
Your Item Power : ${battle.Victim.AverageItemPower}
Killboard : https://handholdreport.com/#/killboard/${battle.BattleId}`}
                            battles.push(bat)
                        })
                        let embedDeaths = { embed: {
                            color: 3447003,
                            title: `${message.author.username} Deaths`,
                            description: "**Type !regear <deathID> to launch your regear request**",
                            fields: battles,
                            // timestamp: new Date(),
                            // image: {
                            //     url: currentApplication[message.author.id].image,
                            // },
                        }
                        }
                        message.channel.send(embedDeaths);
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
                .catch( err => {
                    bot.channels.cache.get('737744651498291308').send('The request failed. Please try again')
                })
            })()
            bot.channels.cache.get('737744651498291308').send('Looking for your profile ...')
        
            break
            case 'regear':
                bot.channels.cache.get('737744651498291308').send('Looking for your death screenshot ...');
                let deathID = args[1];
                (async () => {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.setViewport({ width: 2560, height: 1780 }) 
    
                    await page.goto(`https://albiononline.com/en/killboard/kill/${deathID}`);
                    await page.waitForSelector(".end .item-list__body .item--MainHand img")
                    setTimeout(async () => { 
                      await page.screenshot({
                          path: 'example.png',
                      //   fullPage: false,
                          clip: {
                              x: 1370,
                              y: 490,
                              width: 430,
                              height: 1100
                          }
                      });
                      await browser.close();
                        // message.channel.send(exampleEmbed);
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
                })()
            
            break
        /* case 'ping':
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setViewport({ width: 2560, height: 1780 }) 

                await page.goto('https://albiononline.com/en/killboard/kill/103773175').catch(message.channel.send('pong!'));
                await page.waitForSelector(".end .item-list__body .item--MainHand img").catch(message.channel.send('pong!'))
                setTimeout(async () => { ;
                  await page.screenshot({
                      path: 'example.png',
                  //   fullPage: false,
                      clip: {
                          x: 1370,
                          y: 490,
                          width: 430,
                          height: 1100
                      }
                  });
                  await browser.close();
                    message.channel.send(exampleEmbed);
                    message.channel.send('pong!', {files : ["./example.png"]}) // NO TAG
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
                
            break; */
    }

})

bot.login(token)
