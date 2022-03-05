module.exports = {
    name: 'tremove',
    alias: ['tkick', 'trimuovi'],
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
                if (!hasThePerm){
                    return message.channel.send("L'utente NON ha già il permesso")
                }
                if (utente.permissions.has('MANAGE_CHANNELS')){
                    message.channel.send('Non puoi rimuovere questo utente')
                }
                message.channel.permissionOverwrites(utente,{
                    VIEW_CHANNEL: false
                });
                message.channel.send(`${utente.toString()} è stato rimosso dal ticket!`)
            }
        }
    }
}