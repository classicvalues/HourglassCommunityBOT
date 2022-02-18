const {MessageEmbed} = require('discord.js');
const { MongoBatchReExecutionError } = require('mongodb');
module.exports={
	name: 'info',
	data:{
		name: 'info'
	}
	exec(message,interaction,args){
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
