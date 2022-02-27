module.exports = {
    name: 'ticketmessage',
    execute(message){
        message.delete();
        message.channel.send('Clicca sulla reazione per il ticket')
        .then(msg => msg.react('📩'));
    }
}
