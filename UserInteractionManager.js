const _prompt = require('prompt-sync')();

class UserInteractionManager {

    askInput(headers) {
    
        let itemToWrite = {};
        for (let i = 1; i < headers.length; i++) {
            itemToWrite[headers[i]] = prompt(`Enter your ${headers[i]}: `);
        }
    
        return itemToWrite;
    }
    
    
    outputData (elements) {
        if (Array.isArray(elements)) {
            elements.forEach((element) => {
                console.log(`${element.id}. ${element.Name} is ${element.Age} years old, lives in ${element.City} and works as ${element.Position}`);
            }); 
        } else {
                console.log(elements);
        }
    }


    prompt (str) {
        return _prompt(str);
    }


    logOutput (str) {
        console.log(str);
    }
}

module.exports = new UserInteractionManager(); 
