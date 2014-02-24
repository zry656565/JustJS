((function(){
    var bindList = [
        {
            name: 'Object',
            func: [ 'clone', 'in' ]
        }
    ];

    var bind = function () {
        Object.prototype.clone = function () {
            var obj, i, attr;
            obj = {};

            for (attr in this) {
                if (this.hasOwnProperty(attr)) {
                    if (typeof(this[attr]) === "object") {
                        if (this[attr] === null) {
                            obj[attr] = null;
                        }
                        else if (Object.prototype.toString.call(this[attr]) === '[object Array]') {
                            obj[attr] = [];
                            for (i=0; i<this[attr].length; i++) {
                                obj[attr].push(this[attr][i].clone());
                            }
                        } else {
                            obj[attr] = this[attr].clone();
                        }
                    } else {
                        Object.defineProperty(obj, attr, Object.getOwnPropertyDescriptor(this, attr));
                    }
                }
            }
            return obj;
        };

        Object.prototype.in = function (arr) {
            if (Object.prototype.toString.call(arr) === '[object Array]') {
                for (var i=0; i<arr.length; i++) {
                    if (arr[i] === this.valueOf()) {
                        return true;
                    }
                }
            }
            else {
                console.log('Error 1001: the argument of Object.in() is not an array.');
            }
            return false;
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