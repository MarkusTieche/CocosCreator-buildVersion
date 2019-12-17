
var fs = require('fs');
var plist = require('plist'); //https://www.npmjs.com/package/plist

function onBuildFinish (options, callback) {
    // var url = options.project+"/project.json";
    var url = __dirname+"/bin/data.json";
    // var url = options.project+"packages/build-version/buildVersion.json";
    var file = fs.readFileSync(url);     
    var json = JSON.parse(file);     

    // fs.writeFileSync(url, JSON.stringify(json,null, 2)); 
    // //INCREMENT BUILD VERSION
    json.buildVersion += 1;
    
    Editor.log("buildVersion:",json.buildVersion);

    // //DATE & TIME
    let buildDate =Date.now();
    let date_ob = new Date(buildDate);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    //ADD TO HISTORY
    json.history.unshift("buildVersion "+json.buildVersion+" ["+year + "-" + month + "-" + date+"  "+ date_ob.getHours()+":"+date_ob.getMinutes() +"] "+options.actualPlatform);
    fs.writeFileSync(url, JSON.stringify(json,null, 2));   
    //LOG HISTORY
    // Editor.log(json.history) 

    //CHANGE INFO.PLIST FOR IOS
    if(options.actualPlatform == "ios")
    {
        var path =  options.buildPath+"/jsb-link/frameworks/runtime-src/proj.ios_mac/ios/Info.plist"
        var infoPlist = fs.readFileSync(path,"utf8");    
        
        var val = plist.parse(infoPlist);
            val.CFBundleVersion = json.buildVersion.toString();
        var xml = plist.build(val);
        fs.writeFileSync(path, xml, { encoding: 'utf8' });
    }

    //CHANGE BUILD.GRADLE FOR ANDROID
    if(options.actualPlatform == "android")
    {
        var path =  options.buildPath+"/jsb-link/frameworks/runtime-src/proj.android-studio/app/build.gradle"
        var gradle = fs.readFileSync(path,"utf8");     
        var newGradle = gradle.replace(/^.*versionCode.*$/mg, "        versionCode "+json.buildVersion);
        fs.writeFileSync(path, newGradle, { encoding: 'utf8' });
    }

    callback();   
}

module.exports = {
    load () {
        Editor.Builder.on('build-finished', onBuildFinish);
    },

    unload () {
        Editor.Builder.removeListener('build-finished', onBuildFinish);
    }
};
