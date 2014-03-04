JustJS
======

JustJS is a Javascript Core Library powered by JerryZou. You can use javascript more easily with JustJS. The sample follows:

Just include this script for using:

    <script src="JustJs-0.1.0.js"></script>

And enjoy JustJS:

    J(function(){
        var x = 5;
        var y = '5';
        var arr = [1,2,3,4,5];
        console.log(x.in(arr)); //return true;
        console.log(y.in(arr)); //return false;

        var obj_1 = { a:{b:1}, c:[1,2,3] };
        var obj_2 = { a:{b:1}, c:[1,2,3] };
        console.log( obj_1===obj_2 );     //return false;
        console.log( obj_1.equal(obj_2) );  //return true;
    });

