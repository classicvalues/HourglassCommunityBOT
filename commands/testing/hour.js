module.exports={
    name: 'hour',
    alias:['cheoresono', 'che ore sono'],
    execute(message,args){
        const time = new Date();
        const ora = time.getHours();
        const minuto = time.getMinutes();
        message.channel.send(`Sono le ore ⌚ ${ora}:${minuto}`)
    }
}