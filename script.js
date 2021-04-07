const {CsvConnector} = require('./CsvConnector');
const UIManager = require('./UserInteractionManager');

const file = 'mytestdata.csv';


function main () { 
    const csvObject = new CsvConnector(file, ['Age']);
    const headers = csvObject.headers;

    const menu = UIManager.getPrompt('What do you want to do? Select number and press Enter.\n 1 - read all lines from file; \n 2 - read specific line from file by number; \n 3 - write to csv, \n 4 - delete row from csv, \n 5 - edit specific line from file by number');
    if (menu == '1') {
        UIManager.outputData(csvObject.readAllLines());
    } else if (menu == '2') {
        const lineNumber = UIManager.getPrompt('Enter line number and press Enter\n');
        UIManager.outputData(csvObject.readSpecificLine(lineNumber));
    } else if (menu == '3') {
        
        let itemToWrite = UIManager.askInput(headers);
        csvObject.writeToCsv(itemToWrite);
        
    } else if (menu == '4') {
        const lineNumber = UIManager.getPrompt('What line would you like to delete? Enter line number and press Enter\n');
        console.log('You will be deliting this row: ');
        console.log(csvObject.readSpecificLine(lineNumber));
        const del = UIManager.getPrompt(`Would you like to proceed? Enter 'y' or 'n': `);

        if (del == 'y') {
            csvObject.deleteSpecificRow(lineNumber);
            console.log('Deleting...')
        } else {
            console.log('Exit...');
        }

        
    } else if (menu == '5') {
        const lineNumber = UIManager.getPrompt('What row would you like to edit? Enter line number and press Enter\n');
        console.log('You will be editing this row: ');
        console.log(csvObject.readSpecificLine(lineNumber));
        const edit = UIManager.getPrompt(`Would you like to proceed? Enter 'y' or 'n': `);
        if (edit == 'y') {
            let itemToWrite = UIManager.askInput(headers);
            csvObject.editSpecificRow(lineNumber, itemToWrite);
        } else {
            console.log('Exit...');
        }

    }
}


main();