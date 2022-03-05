const canvas = require('discord-canvas');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'ship',
    alias:['shipmetro', 'quantotivuoibene'],
    execute(message){
        const shipLevel = Math.random(0,100);
        const utenteShip = message.mentions.members.first() || message.member;
        const embedShip = new MessageEmbed()
        .setTitle('Ship')
        .setDescription('Ship command')
        .setColor('RED')
        .addField('Tu e l\'altro utente', `${utenteShip}: ship level : ${shipLevel}`, false);
        message.channel.send({embeds:[embedShip]});
    }
}