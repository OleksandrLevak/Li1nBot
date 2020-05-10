
 module.exports = {

    debug(obj = {}) {
        return JSON.stringify(obj, null, 4);
     },
    
    getChatId(msg){
        return msg.chat.id;
    },
    
    getItemDescription(source){
        const subFlag = source.substr(3, source.length);
        const arrOfInfo = subFlag.split('. ');

        const arrOfCapInfo = getCapitalizedWords(arrOfInfo);

        const description = `${arrOfCapInfo[0]}\nВиробництво: ${arrOfCapInfo[1]}\nРозмір: ${arrOfCapInfo[2]}\nЦіна: ${arrOfCapInfo[3]} грн.\n№ ${arrOfCapInfo[4]}\n`
        return description;
    },

    getCapitalizedWords(arrOfinfo){
        const arrOfCapInfo = []

        for(word of arrOfinfo){
           const wordCap = word.charAt(0).toUpperCase() + word.slice(1);
           arrOfCapInfo.push(wordCap);
        }
        return arrOfinfo;
    }
 }

