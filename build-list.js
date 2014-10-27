var fs = require('fs');
var icons = module.exports;

function scanDirectory(dir){
    fs.readdir(dir, function(error, list){
        var tempArray = [];

        if(error){
            return error
        }

        list.forEach(function(file, i){
            var path = dir + '/' + file;
            tempArray.concat(printObj(path, file));
        });

        // console.log(JSON.stringify(tempArray, null, 4));
        return tempArray
    });
}

function printObj(path, file){
    fs.stat(path, function(error, stat){

        if(stat && stat.isDirectory()){
            scanDirectory(path)
        } else if(file != '.DS_Store'){
            tempObj = {};
            tempObj.href = path;
            tempObj.filename = file.replace('.svg', '');

            // console.log(tempObj);
            return tempObj
        }
    });
}

icons.list = function(dir){
    var masterObj = {};
    masterObj.icons = scanDirectory('svg');
    console.log(JSON.stringify(masterObj, null, 4));
}

icons.list();
