
 module.exports = {

    debug(obj = {}) {
        return JSON.stringify(obj, null, 4);
     },
    
    getChatId(msg){
        return msg.chat.id;
    },
    
    getItemDescription(source){
        const subFlag = source.substr(3, source.length);
        const arrOfinfo = subFlag.split('. ');

        const description = `${arrOfinfo[0]}\nВиробництво: ${arrOfinfo[1]}\nРозмір: ${arrOfinfo[2]}\nЦіна: ${arrOfinfo[3]} грн.\n№ ${arrOfinfo[4]}\n`
        return description;
    }
 }

