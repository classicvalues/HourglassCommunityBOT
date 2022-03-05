const {Message} = require('discord.js');
module.exports = {
    name: 'tadd',
    alias : ['taggiungi', 'aggiungialticket'],
    /**
     * 
     * @param {Message} message
     */
    execute(message){

        let topic = message.channel.topic;
        if(!topic) {
            message.channel.send('Non puoi usare questo comando qui');
            return;
        }
        if (topic.startsWith("UID:")){
            let uid = topic.slice(5);
            if(message.author.id == uid || message.member.permissions.has('MANAGE_CHANNELS')){
                let utente = message.mentions.members.first();
                if (!utente){
                    return message.channel.send('Inserisci un utente valido')
                }
                let hasThePerm = message.channel.permissionsFor(utente).has('VIEW_CHANNEL', true)
                if (hasThePerm){
                    return message.channel.send("L'utente ha già il permesso")
                }
                message.channel.permissionOverwrites(utente,{
                    VIEW_CHANNEL: true
                });
                message.channel.send(`${utente.toString()} è stato aggiunto al ticket!`)
            }
        }
    }
}