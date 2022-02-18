/*Questo è il bot!*/ 
require('dotenv').config();
const ytch = require('yt-channel-info');
//? Settaggi per DisTube.
/*const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');*/
/*client.distube = new DisTube(client,{
    leaveOnEmpty: true,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});*/
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
//const {Canvas} = require('canvas');

client.on('ready', () =>{
    console.log('online');
    const server = client.guilds.cache.get('938503685145788448');
    server.commands.create(
            {
                name: 'test',
                description: 'testing command'
            }
        )
    server.commands.create(
            {
                name: 'ban',
                description: 'ban command',
                options:[
                    {
                        name: 'utente',
                        description: 'Utente da bannare',
                        type: 'USER',
                        required: true
                    },
                    {
                        name: 'motivo',
                        description: 'Motivo del ban',
                        type: 'STRING',
                        required: false
                    }
                ]
            }
    )
    server.commands.create({
        name: 'clear',
        description: 'Cancella i messaggi',
        options:[
            {
                name: 'canale-cancellazione',
                description: 'il canale di cui cancellare i messaggi',
                type: 'CHANNEL',
                required: true
            },
            {
                name: 'numero-di-messaggi',
                description: 'il numero di messaggi da cancellare (fino a 100)',
                type: 'INTEGER',
                required: false
                
            }
        ]
    })
    server.commands.create({
        name: 'lockdown',
        description: 'Manda in lockdown il server',
        options:[
            {
                name: 'si_o_no',
                type: 'BOOLEAN',
                required: true,
            }
        ] //presto si farà un eccezione coi livelli
        
    });
    server.commands.create({
        name: 'mute',
        description: 'muta un utente',
        options:[
            {
                name: 'tempo',
                description: 'durata del mute',
                type: 'NUMBER',
                required: true
            },
            {
                name: 'motivo-mute',
                description: 'motivo del mute',
                type: 'STRING',
                required: false
            }
        ]
    })
    
});


client.on('interactionCreate', (interaction) =>{
    if(!interaction.isCommand) return;
    const nomecomando = interaction.commandName;
    client.commands.get(nomecomando).exec(interaction);
})





//! Questo permette al bot di connettersi a discord (non posso farle vedere il token poichè è personale)
client.login(process.env.token)
//? Questo permette di non fare un casino e mettere 1000 righe di codice.
const fs = require('fs');
client.commands = new ds.Collection();
const cmdfiles = fs.readdirSync('./commands').filter(files => files.endsWith('.js'));
for (const files of cmdfiles){
    const command = require(`./commands/${files}`);
    client.commands.set(command.name,command.data, command)
}
const cmdfolder = fs.readdirSync('./commands')
for (const folder of cmdfolder){
    const cmdfiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for(const file of cmdfiles){
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name,command.data, command);
    }
}
// Messaggi di benvenuto e addio
client.on('guildMemberAdd', (member)=>{
    const welcomechannel = client.channels.cache.get('938504219474923581');
    welcomechannel.send(`Benvenuto ${member.toString()} in ${member.guild.name}.
    Leggi le regole per evitare problemi <#938504224407433247> 🧢`);
    
    
});
client.on('guildMemberRemove', (member)=>{
    const canaleaddio = client.channels.cache.get('939553273378136074');
    canaleaddio.send(`
    Ci dispiace che te ne sia andato... speriamo che ti sia divertito!
    `)
})
//! LAVALINK
/*const {Node} = require('lavalink');
const lavaclient = new Node({
    password: 'Raccoon',
    userID: '939191423830474814',
    host: 'node01.lavalink.eu'
});
client.on('voiceStateUpdate', (shard, state) => lavaclient.voiceStateUpdate(state));
client.on('voiceServerUpdate', (shard, info) => lavaclient.voiceServerUpdate(info));
client.on('guildCreate', (shard, guild) =>{
    for (const state of guild.voiceStates()) lavaclient.voiceStateUpdate(state);
});
const player = lavaclient.players.get('938503685145788448');
const res = lavaclient.load('ytsearch:monstercat');
player.play(res.tracks[0]);
player.join('938504221504983050');*/

//! Qui c'è la parte interessante del bot coi comandi! Vuole continuare? (lo scriva in chat)

client.on('interactionCreate', (interaction) =>{
    if(!interaction.isCommand()) return;
    console.log(interaction);
    
})
const config = require('./config/ds.json');
client.on('messageCreate', async (message) =>{
    const prefix = "hc";
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase()

    if (!client.commands.has(command)) return;

    client.commands.get(command).exec(message,args)
    //! Sistema delle parolacce
    let parolacce = require('./config/parolacce.json');
    let trovata = false;
    parolacce.forEach(word=>{
        if(message.content.includes(word)){
            trovata = true;
        }
    });
    if(trovata){
        message.delete();
        const embedParolaccia = new ds.MessageEmbed()
        .setTitle('hai inviato una parolaccia')
        .setColor('#ef2245')
        .setFooter('non scrivere parolacce :)')
        .setTimestamp();
        message.channel.send({embeds:[embedParolaccia]})
            }
	/*if(message.content.toLowerCase() === `!rec` && message.author.id == client.application?.owner.id){
        const slasharray =[
            {
                name: 'ping',
                description: 'pong'
            }
        ]
        const slash = await client.guilds.cache.get(config.idServer)?.commands.set(slasharray);
        console.log(slash)
    }*/
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
