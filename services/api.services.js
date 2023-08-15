const axios = require('axios');

class DogApi {
    constructor(){
        this.api = axios.create({
          baseURL: 'https://api.api-ninjas.com/v1/dogs',
          headers: {
            'X-Api-Key': 's1L7D6pulueRcrXL+L8NUQ==s55uGnGkcVHhwajh'
          },
        });
    }

    // API Actions
    getByName = (name) =>{
        return this.api.get('?name=' + name);    
    }
}

module.exports = DogApi;