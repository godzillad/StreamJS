streamJS
===========

Motivation: I wanted to write the following scala program in javascript. This uses streams for lazy evaluation.

def isPrime: Boolean =
    (start > 1) && (primes takeWhile { _ <= Math.sqrt(start) } forall { start % _ != 0 })

val primes = Stream.cons(2, Stream.from(3, 2) filter { _.isPrime })


So implemented a lazily evaluated Stream. The next element in the Stream is evaluated only when the take(n) method is called.

Methods
-------

1) Constructor: Stream(head, step, filterFunction)

>head (required) : First element of the stream
>step (optional, defaults to 1) : Next element in stream (Arithmatic progression only)
>filterFunction (optional, default is no filter) : A function that given an element of the stream returns true or false.

2. take (n)

>Returns an array of the first n elements of the stream.
>n : The number of elements to fetch.

3. cons(stream)

>Creates and returns a new Stream which is generated by appending a stream to the current head.

4. filter(func)

>Returns a new Stream with the filter set to the function func.


Usage 
-----
1)
```
var s1 = new Stream(2,3);
console.log(s1.take(5));
```
> [2,5,8,11,14]
 
2)
```
var s2 = new Stream(99);
var s3 = s1.cons(s2);
console.log(s3.take(5));
```
> [2,99,100,101,102]

3)
```
function isFiver (n){
	if (n%5 ==0)
		return true;
	else
		return false;
}

var s4 = s1.filter(isFiver);
console.log(s4.take(5));
```
>[5,20,35,50,65]

4)
```
function isPrime(n){ 
	if (n == 2)
		return true;
	var x = Math.floor(Math.sqrt(n));
	var a = primes.take(x);
	return a.every ( function ( e ) { return n % e != 0 } );
}

var primes = new Stream(2).cons ( new Stream(3,2).filter(isPrime));

console.log(primes.take(5));
```
>[2,3,5,7,11]

