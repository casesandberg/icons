var fs = require('fs');
var jf = require('jsonfile');
var icons = module.exports;

function scanDirectory(dir){
    var tempArray = [];

    fs.readdirSync(dir).forEach(function(file, i){
        var result = printObj(dir + '/' + file, file);
        if(result != undefined){
            tempArray = tempArray.concat(printObj(dir + '/' + file, file))
        }
    });

    return tempArray
}

function printObj(path, file){

    var stat = fs.statSync(path);

    if(stat && stat.isDirectory()){
        return scanDirectory(path)
    } else if(file != '.DS_Store'){

        if(path.indexOf('-toolbar') == -1){
            tempObj = {};
            tempObj.href = path;
            tempObj.filename = path.replace('.svg', '').replace('svg/', '');

            return [tempObj]
        }
    }
}

icons.list = function(dir){
    var masterObj = {};
    masterObj.icons = scanDirectory('svg');
    jf.writeFileSync('svg-list.json', masterObj);
}

icons.list();
