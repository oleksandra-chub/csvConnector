const {CsvConnector} = require('./CsvConnector');


const prompt = require('prompt-sync')();
const file = 'mytestdata.csv';

function askInput(headers) {
    
    let itemToWrite = {};
    for (let i = 1; i < headers.length; i++) {
        itemToWrite[headers[i]] = prompt(`Enter your ${headers[i]}: `);
    }

    return itemToWrite;
}


function outputData (elements) {
    if (Array.isArray(elements)) {
        elements.forEach((element) => {
            console.log(`${element.id}. ${element.Name} is ${element.Age} years old, lives in ${element.City} and works as ${element.Position}`);
        }); 
    } else {
            console.log(elements);
    }
}

function main () { 
    const csvObject = new CsvConnector(file, ['Age']);
    const headers = csvObject.getHeaders();

    const menu = prompt('What do you want to do? Select number and press Enter.\n 1 - read all lines from file; \n 2 - read specific line from file by number; \n 3 - write to csv, \n 4 - delete row from csv, \n 5 - edit specific line from file by number');
    if (menu == '1') {
        outputData(csvObject.readAllLines());
    } else if (menu == '2') {
        const lineNumber = prompt('Enter line number and press Enter\n');
        outputData(csvObject.readSpecificLine(lineNumber, this.integerHeaders));
    } else if (menu == '3') {
        
        let itemToWrite = askInput(headers);
        csvObject.writeToCsv(itemToWrite);
        
    } else if (menu == '4') {
        const lineNumber = prompt('What line would you like to delete? Enter line number and press Enter\n');
        console.log('You will be deliting this row: ');
        console.log(csvObject.readSpecificLine(lineNumber, this.integerHeaders));
        const del = prompt(`Would you like to proceed? Enter 'y' or 'n': `);

        if (del == 'y') {
            csvObject.deleteSpecificRow(lineNumber);
            console.log('Deleting...')
        } else {
            console.log('Exit...');
        }

        
        
    } else if (menu == '5') {
        const lineNumber = prompt('What row would you like to edit? Enter line number and press Enter\n');
        console.log('You will be editing this row: ');
        console.log(csvObject.readSpecificLine(lineNumber, this.integerHeaders));
        const edit = prompt(`Would you like to proceed? Enter 'y' or 'n': `);
        if (edit == 'y') {
            let itemToWrite = askInput(headers);
            csvObject.editSpecificRow(lineNumber, itemToWrite);
        } else {
            console.log('Exit...');
        }

    }
}


main();