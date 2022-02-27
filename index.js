require('dotenv').config();
global.ds = require('discord.js');
global.client = new ds.Client({
    intents: 32767,
    partials:['MESSAGE', 'CHANNEL', 'REACTION'],
});
//todo Mettere la musica... senza quel famoso file jar...
// const {DisTube} = require('distube');
// const {SpotifyPlugin} = require('@distube/spotify');

// client.distube = new DisTube(client, {
    
// })

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
                .setDescription('Stai eseguendo un comando solo per lo staff.')
        }
    }
});
//! Ticket system...
client.on('messageReactionAdd', async function(messageReaction, user){
    if (user.bot) return;
    if (messageReaction.message.partial) await messageReaction.message.fetch();
    if(messageReaction.emoji.name == "📩"){
        if (messageReaction.message.channel.id == "947105751401398272"){
            messageReaction.users.remove(user);
            let server = messageReaction.message.channel.guild;
            if(server.channels.cache.find(canale => canale.topic == `Ticket di ${user.username} (${user.id})`)){
                user.send("Hai già un ticket aperto").catch(() => {})
                return;
            }
            server.channels.create(`ticket-${user.username}`, {
                type: 'text'
            }).then(canale => {
                canale.setTopic(`Ticket di ${user.username} (${user.id})`);
                canale.setParent("938504214169157713");
                canale.permissionOverwrites.set([
                    {
                        id: server.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ]);
                canale.send('Grazie per aver aperto un ticket!\nScrivi se il ticket è supporto generale, partnership o supporto per altro!\r')
            })
        }
    }
})