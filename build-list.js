var fs = require('fs');
var jf = require('jsonfile');
var icons = module.exports;

function scanDirectory(dir){
    var tempArray = [];

    fs.readdirSync(dir).forEach(function(file, i){
        tempArray = tempArray.concat(printObj(dir + '/' + file, file))
    });

    return tempArray
}

function printObj(path, file){

    var stat = fs.statSync(path);

    if(stat && stat.isDirectory()){
        return scanDirectory(path)
    } else if(file != '.DS_Store'){
        tempObj = {};
        tempObj.href = path;
        tempObj.filename = path.replace('.svg', '').replace('svg/', '');

        return [tempObj]
    }
}

icons.list = function(dir){
    var masterObj = {};
    masterObj.icons = scanDirectory('svg');
    jf.writeFileSync('svg-list.json', masterObj);
}

icons.list();
