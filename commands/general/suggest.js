const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'suggest',
    alias: ['suggerimento', 'suggerisci', 'idea'],
    /***
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute(message, args){
        let idea = args.join(" ");
        if(!idea) return message.channel.send('Suggerimento vuoto/invalido');
        const embedSuggest = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`Suggerimento:\n${idea}`)
        .setColor('BLURPLE');
            }
}