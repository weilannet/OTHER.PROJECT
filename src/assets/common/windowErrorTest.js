window.onerror=testError;
function testError(){
    var arglen=arguments.length;
    alert(arglen)
    var errorMsg="参数个数："+arglen+"个";
    for(var i=0;i<arglen;i++){
        errorMsg+="/n参数"+(i+1)+"："+arguments[i];
    }
    alert(errorMsg);
   // window.onerror=null;
    return true;
}
console.warn('testerror')