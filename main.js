const {CsvConnector} = require('./CsvConnector');
const UIManager = require('./UserInteractionManager');

const file = 'mytestdata.csv';


function main () { 
    const csvObject = new CsvConnector(file, ['Age']);
    const headers = csvObject.headers;

    const menu = UIManager.prompt('What do you want to do? Select number and press Enter.\n 1 - read all lines from file; \n 2 - read specific line from file by number; \n 3 - write to csv, \n 4 - delete row from csv, \n 5 - edit specific line from file by number');
    
    switch (menu) {
        case '1':
            UIManager.outputData(csvObject.readAllLines());
            break;
        case '2':
            const lineToRead = UIManager.prompt('Enter line number and press Enter\n');
            UIManager.outputData(csvObject.readSpecificLine(lineToRead));
            break;
        case '3':
            let itemToWrite = UIManager.askInput(headers);
            csvObject.writeToCsv(itemToWrite);
            break;
        case '4':
            const lineToDelete = UIManager.prompt('What line would you like to delete? Enter line number and press Enter\n');
            UIManager.logOutput('You will be deliting this row: ');
            UIManager.logOutput(csvObject.readSpecificLine(lineToDelete));
            const del = UIManager.prompt(`Would you like to proceed? Enter 'y' or 'n': `);

            if (del == 'y') {
                csvObject.deleteSpecificRow(lineToDelete);
                UIManager.logOutput('Deleting...')
            } else {
                UIManager.logOutput('Exit...');
            }
            break;
        case '5':
            const lineToEdit = UIManager.prompt('What row would you like to edit? Enter line number and press Enter\n');
            UIManager.logOutput('You will be editing this row: ');
            UIManager.logOutput(csvObject.readSpecificLine(lineToEdit));
            const edit = UIManager.prompt(`Would you like to proceed? Enter 'y' or 'n': `);

            if (edit == 'y') {
                let itemToWrite = UIManager.askInput(headers);
                csvObject.editSpecificRow(lineToEdit, itemToWrite);
            } else {
                UIManager.logOutput('Exit...');
            }
    }

}


main();