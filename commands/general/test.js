module.exports = {
    name: 'test',
    alias: ['funziona', 'prova'],
    onlyStaff: true,
    execute(message){
        message.channel.send('test')
    }
};