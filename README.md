JustJS
======

JustJS is a Javascript Core Library powered by JerryZou. You can use javascript more easily with JustJS. The sample follows:

Just include this script for using:

    <script src="JustJs-0.1.7.js"></script>

And enjoy JustJS:

    J(function(){
        var arr = ['a','b','c','d'];
        arr.swap(0,2);
        console.log(arr); //return ['c','b','a','d'];

        var obj_1 = { a:{b:1}, c:[1,2,3] };
        var obj_2 = { a:{b:1}, c:[1,2,3] };
        console.log( obj_1===obj_2 );     //return false;
        console.log( obj_1.equal(obj_2) );  //return true;
    });

If you don't care about polluting the global namespace, you can:

    J('bind');
    /*
     * do anything you want with JustJS
     */

    //And when you don't want to use JustJS any more, you can call J('unbind')
    J('unbind');

## References
[Object Methods](https://github.com/zry656565/JustJS/wiki/Object-Method) - methods of Object extended by JustJS <br/>
[Array Methods](https://github.com/zry656565/JustJS/wiki/Array-Method) - methods of Array extended by JustJS <br/>
[String Methods](https://github.com/zry656565/JustJS/wiki/String-Method) - methods of String extended by JustJS <br/>

## Use JustJS in your Node.js APP
Install the JustJS module first

    npm install justjs
    
And Call JustJS like this:

    var J = require('justjs').J; //or require('justjs').JustJS
    
    J(function(){
        ...
    });
