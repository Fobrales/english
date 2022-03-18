import axios from 'axios'

export default class API {

    static translate (word) {
        const data = {
            key: 'dict.1.1.20220318T180138Z.729f954572128bb7.3518b3632a318c9fffa7ac5c38343ccdc910e14f',
            lang: 'en-ru',
        }
        return axios.get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${data.key}&lang=${data.lang}&text=${word}`)
    }

}