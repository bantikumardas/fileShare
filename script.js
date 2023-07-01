const File = require('./models/file');
const fs = require('fs');


async function fetchData() {
    // 24 hours 
    const pastDate = new Date(Date.now() - 1000 * 60*1);
    console.log("called");
    const files =await File.find({ createdAt: { $lt: pastDate } });
    console.log(files.length);
    if (files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path);
                await file.deleteOne({uuid:file.uuid});
                console.log(`successfully deleted ${file.filename}`);
            }catch(err){
                console.log(`Error while deleting files ${err}`)
            }
           
        }
        console.log(`job done`);
    }
}


module.exports=fetchData;