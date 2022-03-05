module.exports = {
    name: 'tclose',
    alias: ['tchiudi'],
    execute(message){
        let topic = message.channel.topic;
        if(!topic) {
            message.channel.send('Non puoi usare questo comando qui');
            return;
        }
        if (topic.startsWith("UID:")){
            let uid = topic.slice(5);
            if(message.author.id == uid || message.member.permissions.has('MANAGE_CHANNELS')){
                message.channel.delete();
            }
        }
    }
}