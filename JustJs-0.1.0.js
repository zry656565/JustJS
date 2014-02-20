((function(){
    var bindList = [
        {
            name: 'Object',
            func: [ 'log' ]
        }
    ];

    var bind = function () {
        Object.prototype.log = function (str) {
            console.log(str);
        }
    }

    var unbind = function () {
        for (var i=0; i<bindList.length; i++) {
            if (bindList[i].name === 'Object') {
                for (var j=0; j<bindList[i].func.length; j++) {
                    delete Object.prototype[bindList[i].func[j]];
                }
            }
        }
    }

    window.J = function (func) {
        var result;

        if (typeof(func)==="function") {
            bind();
            result = func();
            unbind();
            return result;
        }
        else {
            return func;
        }
    }
})());