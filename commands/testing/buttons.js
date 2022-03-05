const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Message
} = require('discord.js');
module.exports = {
    name: 'buttons',
    alias: ['bottoni'],
    onlyStaff: true,
/**
 * 
 * @param {Message} message 
 */
    execute(message){
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Siù')
            .setStyle('LINK')
            .setURL('https://github.com/Xenon-YT/HourglassCommunityBOT')
        );
        const embedConBottoni = new MessageEmbed()
        .setColor('BLURPLE')
        .setTitle('Siù');
            message.channel.send({embeds:[embedConBottoni], components:[row]})
    }
}