var J, JustJS;

((function(){
    var bindList = {
        object: [ 'clone', 'equal', 'at', 'debug' ],
        array: [ 'clone', 'equal', 'swap' ],
        number: [ 'clone', 'equal' ],
        string: [ 'clone', 'equal', 'removeSpace', 'holeStr' ]
    };

    var functionContainer = {
        object: {},
        array: {},
        number: {},
        string: {}
    };

    var bind = function () {
        for (var i=0; i < bindList.object.length; i++) {
            if (Object.prototype[bindList.object[i]]) {
                functionContainer.object[bindList.object[i]] = Object.prototype[bindList.object[i]];
            }
        }
        for (i=0; i < bindList.array.length; i++) {
            if (Array.prototype[bindList.array[i]]) {
                functionContainer.array[bindList.array[i]] = Array.prototype[bindList.array[i]];
            }
        }
        for (i=0; i < bindList.string.length; i++) {
            if (String.prototype[bindList.string[i]]) {
                functionContainer.string[bindList.string[i]] = String.prototype[bindList.string[i]];
            }
        }
        for (i=0; i < bindList.number.length; i++) {
            if (Number.prototype[bindList.number[i]]) {
                functionContainer.number[bindList.number[i]] = Number.prototype[bindList.number[i]];
            }
        }

        /* method of Object */
        Object.prototype.clone = function () {
            var constructor = this.constructor;
            var obj = new constructor();

            for (var attr in this) {
                if (this.hasOwnProperty(attr)) {
                    if (typeof(this[attr]) !== "function") {
                        if (this[attr] === null) {
                            obj[attr] = null;
                        }
                        else {
                            obj[attr] = this[attr].clone();
                        }
                    }
                }
            }
            return obj;
        };

        Object.prototype.equal = function (obj) {
            for (var attr in this) {
                if (this.hasOwnProperty(attr) && obj.hasOwnProperty(attr)) {
                    if (typeof(this[attr]) !== "function") {
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
                }
                else {
                    if (typeof(this[attr]) !== "function") {
                        return false;
                    }
                }
            }
            return true;
        };

        Object.prototype.at = function (arr) {
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
        };

        Object.prototype.debug = function (message) {
            console.log("Debug Message: " + message + ', Value: ' + this.valueOf());
            return this;
        };
        /* END --- method of Object */

        /* Method of Array*/
        Array.prototype.clone = function () {
            var thisArr = this.valueOf();
            var newArr = [];
            for (var i=0; i<thisArr.length; i++) {
                newArr.push(thisArr[i]);
            }
            return newArr;
        };

        Array.prototype.equal = function (arr) {
            var me = this.valueOf();
            if (me.length !== arr.length) {
                return false;
            }
            for (var i=0; i<me.length; i++) {
                if (me[i] !== undefined && arr[i] === undefined) {
                    return false;
                } else if (me[i] === undefined && arr[i] !== undefined) {
                    return false;
                } else if (me[i] !== undefined && arr[i] !== undefined) {
                    if (me[i] !== arr[i]) {
                        return false;
                    }
                }
            }
            return true;
        };

        Array.prototype.swap = function (index1, index2) {
            var me = this.valueOf();
            if (index1 < 0 || index1 > me.length) {
                console.log('Error 2001: the argument index1 of Array.swap(index1, index2) is out of range.');
            }
            if (index2 < 0 || index2 > me.length) {
                console.log('Error 2002: the argument index2 of Array.swap(index1, index2) is out of range.');
            }
            if (index1 === index2) {
                return;
            }
            me = this.valueOf();
            var tmp = me[index1];
            me[index1] = me[index2];
            me[index2] = tmp;
        };
        /* END --- Method of Array */

        /* Method of Number */
        Number.prototype.clone = function() { return this.valueOf(); };
        Number.prototype.equal = function (num) { return this.valueOf() === num; };

        /* Method of String */
        String.prototype.clone = function() { return this.valueOf(); };
        String.prototype.equal = function (str) { return this.valueOf() === str; };
        String.prototype.removeSpace = function () { return this.valueOf().replace(/\s/g, ''); };
        String.prototype.holeStr = function (start, end) {
            return this.valueOf().substr(0, start) + this.valueOf().substr(end);
        }
    };

    var unbind = function () {
        for (var i=0; i < bindList.object.length; i++) {
            if (functionContainer.object.hasOwnProperty(bindList.object[i])) {
                Object.prototype[bindList.object[i]] = functionContainer.object[bindList.object[i]];
            } else {
                delete Object.prototype[bindList.object[i]];
            }
        }
        for (i=0; i < bindList.array.length; i++) {
            if (functionContainer.array.hasOwnProperty(bindList.array[i])) {
                Array.prototype[bindList.array[i]] = functionContainer.array[bindList.array[i]];
            } else {
                delete Array.prototype[bindList.array[i]];
            }
        }
        for (i=0; i < bindList.string.length; i++) {
            if (functionContainer.string.hasOwnProperty(bindList.string[i])) {
                String.prototype[bindList.string[i]] = functionContainer.string[bindList.string[i]];
            } else {
                delete String.prototype[bindList.string[i]];
            }
        }
        for (i=0; i < bindList.number.length; i++) {
            if (functionContainer.number.hasOwnProperty(bindList.number[i])) {
                Number.prototype[bindList.number[i]] = functionContainer.number[bindList.number[i]];
            } else {
                delete Number.prototype[bindList.number[i]];
            }
        }
        functionContainer = {
            object: {},
            array: {},
            number: {},
            string: {}
        };
    };

    JustJS = function (func) {
        var result;

        if (typeof(func)==="function") {
            bind();
            result = func();
            unbind();
        }
        else if (typeof(func)==="string") {
            if (func === 'bind') {
                bind();
            } else if (func === 'unbind') {
                unbind();
            }
        }

        return result;
    };
    J = JustJS;

})());