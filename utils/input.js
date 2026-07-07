async function getInput() {
   const rL = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rL.question('> ', answer => {
            rL.close();
            resolve(answer);
        });
    });
};
module.exports = getInput;