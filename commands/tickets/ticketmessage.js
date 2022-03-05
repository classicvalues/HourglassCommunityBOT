module.exports = {
    name: 'ticketMessage',
    onlyStaff: true,
    alias:['messaggioticket', 'ticketmessage'],
    execute(message){
        message.delete();
        message.channel.send('Clicca sulla reazione per aprire un ticket').then(msg => msg.react(`❓`));
    }
}