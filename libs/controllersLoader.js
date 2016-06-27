
const fs = require('fs');

module.exports = function(dirname, theExports) {
    // 讀取 folder 內的所有檔案
    let folderFiles = fs.readdirSync(dirname);

    folderFiles.forEach(function(file) {

        // 排除 index.js 這個檔案
        if(file === 'index.js') {
            return;
        }

        let path = dirname + '/' + file;
        var methodName = file.replace(/\.js$/, '');

        // 排除不是文件的檔案
        if(!fs.statSync(path).isFile()){
            return;
        }

        // 載入
        if(theExports){
            theExports[methodName] = require(path);
        }
    });
};