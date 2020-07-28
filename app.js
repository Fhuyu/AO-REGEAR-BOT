const Discord = require('discord.js')
const client = new Discord.Client()

const auth = require("./auth");
const token = auth.token
console.log(token)

client.login(token)