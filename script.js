const File = require('./models/file');
const fs = require('fs');


async function fetchData() {
    // 24 hours 
    const pastDate = new Date(Date.now() - 1000 * 60*60*24);
    console.log("called");
    const files =await File.find({ createdAt: { $lt: pastDate } });
    console.log(files.length);
    if (files.length) {
        for (const file of files) {
            try {
                await file.deleteOne({uuid:file.uuid});
                fs.unlinkSync(file.path);
                console.log(`successfully deleted ${file.filename}`);
            }catch(err){
                // console.log(`Error while deleting files ${err}`)
            }
           
        }
        console.log(`job done`);
    }
}


module.exports=fetchData;