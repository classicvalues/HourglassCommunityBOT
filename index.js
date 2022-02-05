require('dotenv').config();
const ytch = require('yt-channel-info');

const ds = require('discord.js');
const client = new ds.Client({
    intents: 32767,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
client.once('ready', () =>{
    console.log('online');
});
client.login('OTM5MTkxNDIzODMwNDc0ODE0.Yf1QLA.lZfa2ERrQJQNGqiBQ6L5LQwGAPw')

const fs = require('fs');
client.commands = new ds.Collection();
const cmdfiles = fs.readdirSync('./commands').filter(files => files.endsWith('.js'));
for (const files of cmdfiles){
    const command = require(`./commands/${files}`);
    client.commands.set(command.name, command)
}
const cmdfolder = fs.readdirSync('./commands')
for (const folder of cmdfolder){
    const cmdfiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for(const file of cmdfiles){
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command)
    }
}


client.on('messageCreate', (message) =>{
    const prefix = "hc";
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase()

    if (!client.commands.has(command)) return;

    client.commands.get(command).exec(message,args)
})

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
}, 1000*30)