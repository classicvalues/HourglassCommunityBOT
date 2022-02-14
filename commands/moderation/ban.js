const { MessageEmbed } = require("discord.js");

module.exports={
    name: 'ban',
    exec(message, args, client){
        const utente = message.mentions.members.first();
        if (!message.member.permissions.has('BAN_MEMBERS')){
            return message.channel.send('non puoi bannare')
        };
        if (!utente){
            return message.channel.send('non stai bannando nessuno')
        };
        if (!utente.bannable){
            return message.channel.send('non posso bannarlo :/')
        };
            utente.ban()
                .then(()=>{
                    const embed = new MessageEmbed()
                        .setTitle(utente.user.username+' bannato con successo')
                        .setColor('BLURPLE')
                        .setDescription('Utente bannato con successo');
                        message.channel.send({embeds:[embed]})
                })

    }
}