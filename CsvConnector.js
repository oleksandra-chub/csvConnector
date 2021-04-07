const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


class CsvConnector {

    #headers;
    #integerHeaders;
    #file;

    constructor (file, integerHeaders) {
        this.#file = file;
        this.#integerHeaders = integerHeaders;
        this.#headers = this.#getHeaders();
    }

    get integerHeaders () {
        return this.#integerHeaders;
    }

    get headers() {
        return this.#headers;
    }

    #getHeaders() {
        const content = this.#readFromFile(this.file);
        const headers = content[0].split(',');
        return headers;
    }

    #readFromFile () {
        let content = fs.readFileSync(this.#file, 'utf-8');
        content = content.split('\r\n');
        
        return content;
    }
    
    #parseData(content, lineNumber) {
        let elements = [];
        const lineNumberToInt = Number(lineNumber);
    
        if (lineNumberToInt) {
            return this.#parseRow(content, lineNumberToInt); 
        } 
    
        for (let i = 1; i < content.length; i++) {
            let obj = this.#parseRow(content, i);
            elements.push(obj);
        }
    
        return elements;
    
    }
    
    
    #parseRow(content, i) {
        try {
            const row = content[i].split(',');
            let obj = {};
            for (let j = 0; j < this.#headers.length; j++) {
                if (this.#integerHeaders.includes(this.#headers[j])) {
                    obj[this.#headers[j]] = Number(row[j]);
                } else {
                    obj[this.#headers[j]] = row[j];
                }
            }
            return obj;
        } catch {
            console.log('Error. There is no such row, try to enter another number');
        }
    }
    
    
    #buildCSVRowFromObject(itemToWrite) {
        let updatedItemToWrite = '';
        for (let i = 0; i < this.#headers.length; i++) {
            if (i == (this.#headers - 1)) {
                updatedItemToWrite += itemToWrite[this.#headers[i]];
            } else {
                updatedItemToWrite += itemToWrite[this.#headers[i]] + ',';
            }
        }
        return updatedItemToWrite;
    }


    readAllLines () {
        const content = this.#readFromFile(this.#file);
        const object = this.#parseData(content);
    
        return object;
    }
    
    
    readSpecificLine (lineNumber) {
        const content = this.#readFromFile(this.#file);
        const object = this.#parseData(content, lineNumber);
    
        return object;
        
    }
    

    writeToCsv (itemToWrite) {
        const newRow = fs.createWriteStream(this.#file, {flags: 'a'}); 
        itemToWrite['id'] = (uuidv4());
        let updatedItemToWrite = '';
    
        try {
            updatedItemToWrite = this.#buildCSVRowFromObject(itemToWrite);
            newRow.write(`\r\n${updatedItemToWrite}`);
            console.log('The row is saved to the file!');
        } catch {
            console.log('Error. The row was not saved to the file.');
        }
    
    }
    
    
    editSpecificRow (lineNumber, itemToWrite) {
        const content = this.#readFromFile(this.#file);
        const lineNumberToInt = Number(lineNumber);
        let updatedItemToWrite = '';
    
        for (let i = 0; i < content.length; i++) {
            if (i == lineNumberToInt) {
                const parsedRow = this.#parseRow(content, i);
                itemToWrite['id'] = parsedRow['id'];
    
                updatedItemToWrite += this.#buildCSVRowFromObject(itemToWrite);
                console.log('The row is saved to the file!');
            } else {
                updatedItemToWrite += content[i];
            }
    
            if (i < (content.length - 1)) {
                updatedItemToWrite += '\r\n';
            }
        }
    
        fs.writeFileSync(this.#file, updatedItemToWrite, 'utf-8');    
    }
    
    
    deleteSpecificRow (lineNumber) {
        const content = this.#readFromFile(this.#file);
        let updatedContent = '';
        const lineNumberToInt = Number(lineNumber);
    
        for (let i = 0; i < content.length; i++) {
            
            if (i == lineNumberToInt) {
                continue;
            } else if (i >= (content.length - 1)) {
                updatedContent += content[i];
            } else {
                updatedContent += content[i]+ '\r\n';
            }
        
        }
    
        fs.writeFileSync(this.#file, updatedContent, 'utf-8');
    
    }
}

module.exports = {
    CsvConnector
};
