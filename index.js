/*Questo è il bot!*/ 
require('dotenv').config();
const ytch = require('yt-channel-info');

//! DATABASE.
/*const dbclient = require('mongodb').MongoClient;
const url = `mongodb+srv://X11:${process.env.passwordDB}@cluster.ynkbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
dbclient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}, function (err,db){
    var DATABASE = db.db("HourglassDB");
    DATABASE.createCollection('UserStats');
    DATABASE.collection('UserStats').insertOne({dstagSothee: 4023, levelSothee: 400, dstagXenon: 1616, levelXenon: 2560, username1: "_Sothee ツ", username2: "Xenon-YT" }, {$set: {levelSothee:4500}});
})*/
const ds = require('discord.js');
const client = new ds.Client({
    intents: 32767,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
client.once('ready', () =>{
    console.log('online');
});
//! Questo permette al bot di connettersi a discord (non posso farle vedere il token poichè è personale)
client.login(process.env.token)
//? Questo permette di non fare un casino e mettere 1000 righe di codice.
const fs = require('fs');
client.commands = new ds.Collection();
const cmdfiles = fs.readdirSync('./commands').filter(files => files.endsWith('.js'));
for (const files of cmdfiles){
    const command = require(`./commands/${files}`);
    client.commands.set(command.name, command)
}
client.user.setActivity('Hourglass Community', {type: 'WATCHING'})
const cmdfolder = fs.readdirSync('./commands')
for (const folder of cmdfolder){
    const cmdfiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for(const file of cmdfiles){
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command)
    }
}
// Messaggi di benvenuto e addio
client.on('guildMemberAdd', (member)=>{
    const welcomechannel = client.channels.cache.get('938504219474923581');
    welcomechannel.send(`Benvenuto ${member.toString()} in ${member.guild.name}.
    Leggi le regole per evitare problemi <#938504224407433247> 🧢`)
});
client.on('guildMemberRemove', (member)=>{
    const canaleaddio = client.channels.cache.get('939553273378136074');
    canaleaddio.send(`
    Ci dispiace che te ne sia andato... speriamo che ti sia divertito!
    `)
})

//! Qui c'è la parte interessante del bot coi comandi! Vuole continuare? (lo scriva in chat)

client.on('messageCreate', (message) =>{
    const prefix = "hc";
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase()

    if (!client.commands.has(command)) return;

    client.commands.get(command).exec(message,args)
})
/*
//! Per finire anche le notifiche dei video
setInterval(()=>{
    ytch.getChannelVideos('TopolinoFumettiDisegni', 'newest').then(async response=>{
        const idvideo = response.items[0]?.videoId
        if (!idvideo) return;

        client.channels.cache.get('939495228967116840').messages.fetch()
            .then(messages =>{
                let mandato = false;
                messages.forEach(msg=>{
                    if(msg.content.includes(idvideo)) mandato = true;
                });
                if (!mandato){
                    client.channels.cache.get('939495228967116840')
                        .send(`
                            Salve, è uscito un nuovo video su **${response.items[0].author}**
                            **${response.items[0].title}**
                            Link: https://youtube.com/watch?v=${idvideo}
                        `)
                }
            })
    })
}, 1000*30) */