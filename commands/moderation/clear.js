module.exports={
    name: 'clear',
    data:{
        name: 'clear',
        description: 'Cancella i messaggi',
    },
    exec(message,interaction,args){
        const canale_messaggi = interaction.options.getChannel('canale-cancellazione')
        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            return message.channel.send(':( non puoi')
        }
        if(!message.guild.me.permissions.has('MANAGE_MESSAGES')){
            return message.channel.send('non ho il permesso :(')
        }
        var count = parseInt(message.content.split(/\s+/)[1]) || interaction.options.getInteger('numero-di-messaggi');
        if(!count){
            return message.channel.send('se non specifichi il numero di messaggi...');
        };
        if(count>100){
            return message.channel.send('Non posso cancellare più di 100 messaggi alla volta.')
        };
        message.channel.bulkDelete(count,true)
        message.channel.send(`${count} messaggi eliminati`) || interaction.reply(`${count} messaggi eliminati`)
        .then(msg=>{
            setTimeout(msg.delete(), 50000)
        })
    }
}