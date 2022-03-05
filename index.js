require('dotenv').config();
const ds = require('discord.js');
const client = new ds.Client({
    intents: 32767,
    partials:['MESSAGE', 'CHANNEL', 'REACTION'],
});
const canvas = require('discord-canvas');
//todo Mettere la musica... senza quel famoso file jar...
const {DisTube} = require('distube');
const {SpotifyPlugin} = require('@distube/spotify');
const {SoundCloudPlugin} = require('@distube/soundcloud');
const {YtDlpPlugin} = require('@distube/yt-dlp')
client.distube = new DisTube(client, {
    leaveOnStop: false, 
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins:[
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
})

client.login(process.env.token);

const prefix = "hc";

const fs = require('fs');

client.commands = new ds.Collection();
//? nel caso facessi un file così.
/*const commandsFiles = fs.readdirSync('./commands').filter(commandfile => commandfile.endsWith('.js'));
for (const commandfile of commandsFiles){
    const command = require(`./commands/${commandfile}`);
    client.commands.set(command.name,command)
}*/

//! Handler

const commandsFolder = fs.readdirSync('./commands');
for(const folder of commandsFolder){
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for(const file of commandsFiles){
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}
const eventsFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));
for (const f of eventsFiles){
    const event = require(`./events/${f}`);
    client.on(event.name, (...args) => event.execute(...args))
}
const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
for (const file of functionFiles){
    const functionFile = require(`./functions/${file}`);
    client.commands.set(functionFile.name, functionFile);
};
client.on('guildMemberAdd', (member) => {
    const immagineBenvenuto = new canvas.Welcome()
    .setUsername(member.toString())
    .setDiscriminator(member.user.discriminator)
    .setMemberCount(member.guild.memberCount.toString())
    .setGuildName(member.guild.name)
    .setAvatar(member.avatar)
    .toAttachment();
    const attach = new ds.MessageAttachment(immagineBenvenuto.toBuffer(), immagineBenvenuto.png);
    member.send(`${attach}`);
 
})

//! Bot

client.on('ready', () =>{
    console.log(`Online\nPing: ${client.ws.ping} ms\n`);
});
client.on('messageCreate', (message) =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command) && !client.commands.find(cmd => cmd.alias && cmd.alias.includes(command))) return;
    const comando = client.commands.get(command) || client.commands.find(cmd => cmd.alias && cmd.alias.includes(command))
    comando.execute(message);
    if(comando.onlyStaff){
        if(!message.member.permissions.has('ADMINISTRATOR')){
            const embedErrore = new ds.MessageEmbed()
                .setTitle('Comando non eseguito')
                .setImage(message.author.displayAvatarURL())
                .setDescription('Stai eseguendo un comando solo per lo staff.');
                message.channel.send({embeds:[embedErrore]});
        }
    }
});
const staff = require('./config/staff.json');
client.on('messageReactionAdd', async function (messageReaction, user){
    if(user.bot) return;
    if(messageReaction.message.partial) messageReaction.message.fetch();
    if(messageReaction.emoji.name == "❓"){
        if(messageReaction.message.channel.id == "947105751401398272"){
            messageReaction.users.remove(user);
            let server;
            server = messageReaction.message.channel.guild;
            if(server.channels.cache.find(c => c.topic == `UID: ${user.id}`)){
                user.send('Hai già aperto un ticket').catch(() => {});
            };
            server.channels.create(`💳丨ticket-${user.username}`,{
                type: 'GUILD_TEXT'
            }).then(channel => {
                channel.setTopic(`UID: ${user.id}`);
                channel.setParent('938504214169157713');
                channel.permissionOverwrites.set([
                    {
                        id: server.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: staff.admin,
                        allow: ["ADMINISTRATOR"]
                    },
                    {
                        id: staff.founder,
                        allow: ["ADMINISTRATOR"]
                    },
                    {
                        id: staff.headStaff,
                        allow: ["ADMINISTRATOR"]
                    },
                    {
                        id: staff.mod,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    },
                    {
                        id: staff.owner,
                        allow: ["ADMINISTRATOR"]
                    }
                ]);
                channel.send(`Grazie per aperto un ticket <@${user.id}>\nScrivi il tuo problema!`);
            })
        }
    }
});
client.on()