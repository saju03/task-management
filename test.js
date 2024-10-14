const fs = require('fs')

const a = () => {
    setImmediate(() => {
        console.log('immidate');

    })

    Promise.resolve(() => {
        console.log('promise');

    })

    setTimeout(() => {
        console.log('timeout');

    }, 0);
    process.nextTick(() => {
        console.log('hello PROCESS');

    })


    fs.readFile('C:/Users/sajus/OneDrive/Desktop/taskManage/abc.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('file read complete');
    });

}

a()


new Promise((resolve, reject) => {

   resolve('hello promise')

}).then((data)=>{
   console.log(data);
   
    
})


