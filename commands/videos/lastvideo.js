const { MessageEmbed } = require('discord.js');
const ytch = require('yt-channel-info');
module.exports={
    name: 'lastvideo',
    exec(message,args){
        const idCanale = "TopolinoFumettiDisegni";
            ytch.getChannelVideos(idCanale, "newest").then((response) =>{
                    const videoEmbed = new MessageEmbed()
                        .setTitle(response.items[0].title)
                        .setURL(`https://youtube.com/watch?v=${response.items[0].videoId}`)
                        .setThumbnail(response.items[0].videoThumbnails[3].url)
                        .addField('Visualizzazioni', response.items[0].viewCount.toString(),true)
                        .addField('Durata',response.items[0].durationText, true)
                        .addField('Pubblicato', response.items[0].publishedText, true);
                        message.channel.send({embeds:[videoEmbed]})
            })
    }
}