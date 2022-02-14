module.exports={
    name: 'hour',
    exec(message,args,client){
        const time = new Date();
        const ora = time.getHours();
        const minuto = time.getMinutes();
        message.channel.send(`Sono le ore ⌚ ${ora}:${minuto}`)
    }
}