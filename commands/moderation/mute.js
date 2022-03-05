module.exports={
    name: 'mute',
    execute(message,args){
        const utenteMute = message.mentions.members.first();
        if(!message.member.permissions.has('MODERATE_MEMBERS')){
            return message.channel.send('Non hai il permesso.')
        }
        if (!utenteMute){
            return message.channel.send('Non hai menzionato nessuno.')
        }
        utenteMute
            .timeout(12345, 'test')
    }
}
