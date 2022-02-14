const { MessageEmbed } = require("discord.js")

module.exports={
    name: 'poll',
    exec(message){
        const embedPoll = new MessageEmbed()
            .setTitle('Sondaggio')
            .setColor('#ecc1fc')
            .setDescription('Prefisso o slash?')
            .addField('Slash', 'premi la prima reazione (lettera A) se vuoi gli slash nel bot', false)
            .addField('Prefisso', 'se vuoi ancora il prefisso (lettera B)premi la seconda reazione');
            message.channel.send({embeds:[embedPoll]})
            .then(function (message){
                message.react('🇦');
                message.react('🇧');
            });
    }
}