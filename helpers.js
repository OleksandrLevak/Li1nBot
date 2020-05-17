const userInstagram = require("user-instagram");
module.exports = {

    debug(obj = {}) {
        return JSON.stringify(obj, null, 4);
    },

    getChatId(msg) {
        return msg.chat.id;
    },

    getItemDescription(source) {
        const subFlag = source.substr(3, source.length);
        const arrOfInfo = subFlag.split('. ');

        //arrOfInfo.forEach(word => word.charAt(0).toUpperCase() + word.slice(1));

        const description = `${arrOfInfo[0]}\nВиробництво: ${arrOfInfo[1]}\nРозмір: ${arrOfInfo[2]}\nЦіна: ${arrOfInfo[3]} грн.\n№ ${arrOfInfo[4]}\n`
        return description;
    },

    getPostInstagram(user) {
        userInstagram(user)
            .then(result => {

                const res = []

                const { posts } = result;

                for (el of posts) {
                    res.push([el.url, el.caption])
                }

                return res;
            });
    }


}