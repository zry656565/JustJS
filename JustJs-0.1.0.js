((function(){
    var bindList = {
        object: [ 'clone', 'in', 'equal', 'debug' ],
        array: [ 'equal' ],
        number: [ 'equal' ],
        string: [ 'equal' ]
    };

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

        Object.prototype.debug = function (message) {
            console.log("Debug Message: " + message + ', Value: ' + this.valueOf());
        }

        Object.prototype.equal = function (obj) {
            for (var attr in this) {
                if (typeof(this[attr]) !== "function") {
                    if (this.hasOwnProperty(attr) && obj.hasOwnProperty(attr)) {
                        if (typeof(this[attr]) === "object") {
                            if (this[attr] === null && obj[attr] === null) { }
                            else {
                                if ((this[attr] !== null && obj[attr] === null)
                                    || (this[attr] === null && obj[attr] !== null))
                                    { return false; }
                                else {
                                    if (!this[attr].equal(obj[attr])) {
                                        return false;
                                    }
                                }
                            }
                        } else {
                            if (this[attr] !== obj[attr]) {
                                return false;
                            }
                        }
                    }
                    else {
                        console.log(3)
                        return false;
                    }
                }
            }
            return true;
        }

        Array.prototype.equal = function (arr) {
            var me = this.valueOf();
            if (me.length !== arr.length) {
                return false;
            }
            for (var i=0; i<me.length; i++) {
                if (me[i] === undefined && arr[i] === undefined) {
                    continue;
                } else if (me[i] !== undefined && arr[i] === undefined) {
                    return false;
                } else if (me[i] === undefined && arr[i] !== undefined) {
                    return false;
                } else {
                    if (me[i] !== arr[i]) {
                        return false;
                    }
                }
            }
            return true;
        }

        Number.prototype.equal = function (num) {
            if (this.valueOf() === num) {
                return true;
            }
            else {
                return false;
            }
        }

        String.prototype.equal = function (str) {
            if (this.valueOf() === str) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    var unbind = function () {
        for (var i=0; i < bindList.object.length; i++) {
            delete Object.prototype[bindList.object[i]];
        }
        for (i=0; i < bindList.array.length; i++) {
            delete Array.prototype[bindList.array[i]];
        }
        for (i=0; i < bindList.string.length; i++) {
            delete String.prototype[bindList.array[i]];
        }
        for (i=0; i < bindList.number.length; i++) {
            delete Number.prototype[bindList.array[i]];
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