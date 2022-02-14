const { MessageEmbed } = require("discord.js")

module.exports={
    name: 'colors',
    exec(message,args,client){
        const embedColori = new MessageEmbed()
            .setColor('#00F1BC')
            .setTitle('Ruoli Reazioni')
            .setDescription('Clicca una reazione per avere il ruolo colore!');
            message.channel.send({embeds:[embedColori]})
                .then(function (message){
                    message.react('🔴');
                    message.react('⚫');
                });
            
    }
}