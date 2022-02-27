const {MessageEmbed} = require('discord.js');
module.exports={
	name: 'info',
	execute(message,interaction,args){
		const infoEmbed = new MessageEmbed()
		.setTitle('Info bot')
		.setColor('#F456D1')
		.setDescription('Informazioni su host e bot.')
		.addField('Architettura host', process.arch, true)
		.addField('Host', process.node.version, true)
		.setTimestamp();
		message.channel.send({embeds:[infoEmbed]}) || interaction.reply({embeds:[infoEmbed]});
	}
}
