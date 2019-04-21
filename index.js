const Discord = require('discord.js');
const { prefix, token, giphyToken } = require('./config.json');
const client = new Discord.Client ();

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken);

client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {
    if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {

        //console.log(message.content);

        if(message.content.startsWith(`${prefix}kick`)) {
            //message.channel.send("kick")

            let member = message.mentions.members.first();
            member.kick().then((member) => {

             giphy.search('gifs', {"q": "bye"})
                .then((response) => {
                    var totalResponses = response.data.length;
                    var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                    var responseFinal = response.data[responseIndex];

                    message.channel.send(":wave: " + member.displayName + " has been kicked", {
                        files: [responseFinal.images.fixed_height.url]
                    })

                }).catch(() => {
                    message.channel.send('error ugh!');
                })

            })
        }
    }
})

client.login(token);