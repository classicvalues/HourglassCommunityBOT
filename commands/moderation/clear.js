module.exports={
    name: 'clear',
    data:{
        name: 'clear',
        description: 'Cancella i messaggi',
    },
    execute(message){
        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            return message.channel.send(':( non puoi')
        }
        if(!message.guild.me.permissions.has('MANAGE_MESSAGES')){
            return message.channel.send('non ho il permesso :(')
        }
        var count = parseInt(message.content.split(/\s+/)[1]);
        if(!count){
            return message.channel.send('se non specifichi il numero di messaggi...');
        };
        if(count>100){
            return message.channel.send('Non posso cancellare più di 100 messaggi alla volta.')
        };
        message.channel.bulkDelete(count,true)
        message.channel.send(`${count} messaggi eliminati`)
        .then(msg=>{
            setTimeout(msg.delete(), 50000)
        })
    }
}