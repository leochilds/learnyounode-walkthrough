# Exercise 2 - Baby Steps

This can be a fun exercise to introduce using command line arguments and arrays. 

# Problem

> Write a program that accepts one or more numbers as command-line arguments and prints the sum of those numbers to the console (stdout).

So, lets consider what we need for this exercise. We need to be able to access data in the command line. Then we need to select parts of that data and perform a mathematical sum. Then we can `console.log()` the answer to that sum. Now we know what we need, let's look at the hints given to us.

# Hints

> You can access command-line arguments via the global `process` object. The `process` object has an `argv` property which is an array containing the complete command-line. i.e. `process.argv`.

Let's go through the `process.argv` command in greater detail. 

## process.argv

An array containing the command line arguments. The first element will be 'node', the second element will be the name of the JavaScript file and directory. The next elements will be any additional command line arguments.

    // print process.argv
    process.argv.forEach(function(val, index, array) {
      console.log(index + ': ' + val);
    });

This will generate:

    $ node process-2.js one two=three four
    0: node
    1: /Users/mjr/work/node/process-2.js
    2: one
    3: two=three
    4: four
  
So that might be a bit confusing, but thats whats in the official documentation at [nodejs.org](http://nodejs.org/api/process.html#process_process).

> To get started, write a program that simply contains:

```js
console.log(process.argv)
```

> Run it with `node program.js` and some numbers as arguments. e.g:

```sh
$ node program.js 1 2 3
```

> In which case the output would be an array looking something like:

```js
[ 'node', '/path/to/your/program.js', '1', '2', '3' ]
```

## For Loops

> You'll need to think about how to loop through the number arguments so  you can output just their sum. The first element of the process.argv array is always 'node', and the second element is always the path to your program.js file, so you need to start at the 3rd element (index 2), adding each item to the total until you reach the end of the array.

So in simple terms, we don't want to use the first two objects in the array. Let's look at the For loop. 

The For loop is structured as follows:

    for (statement1; statement2; statement3) {
      doSomething;
    }
  
Statement1 is a variable declaration. Statement2 is a condition to run the script. Statement3 is something to be done after the script runs. doSomething is the script to run if the condition is true.

Our For loop will look like this:

    for (var i = 2; i < process.argv.length; i++) {
      result += Number(process.argv[i]);
    }
  
So allow me to explain. 

1.  Statement1 `var i = 2`: we have created the variable i which has the starting value of 2. We start at value 2 because we want to ignore the first 2 objects in our array (node and the file name). 
2.  Statement2 `i < process.argv.length`: The .length function gives us the length of our array. So if we had the array `[ 'node', '/path/to/your/program.js', '1', '2', '3' ]` the length would be 5. So our statement means only run the script if i is less than 5. This has 2 effects. The first thing is does is ensure that the code only runs when we have passed arguments through the command line. If we only type `$ node program.js` there will be no numbers and so no need to run the script. The second thing this does is give us the ability to stop the For loop.
3.  Statement3 `i++`: This actually closes the for loop. If you don't close a For loop you can get an infinite loop. Worst case scenario, you crash your server. `i++` means add 1 to the value of i and reassign this to i. This is a shortened version of `i = i + 1`. So if the condition is true, the script is run, then statement3 runs. When the final number is added the value of i will be the same as the length of the array, meaning the condition in statement2 is no longer true and the loop stops.

>  Also be aware that all elements of `process.argv` are strings and you may need to *coerce* them into numbers. You can do this by prefixing the property with `+` or passing it to `Number()`. e.g. `+process.argv[2]` or `Number(process.argv[2])`.

4.  doSomething `result += Number(process.argv[i])` I'm going to break this down:
-  `result`: an undefined variable
- `+=`: add and reassign. So the number on the right hand side is added to the value of the variable on the left hand side. Then the new value is given to the variable. For example: if my variable `shoes` has a value of 3, then the line `shoes += 4` will change the value to 7.
- `Number()`: converts the contents of the brackets into its number equivelant. For example `Number("4")` gives me the value 4, `Number(false)` gives me the value 0. This is necessary as the arguments of process.argv are not numbers, they are strings.
- `process.argv[i]`: The object in position i of the array. This means that depending on how many times the For loop runs, the value of i will reflect a different object inside the array.

So pulling all this together means, add the number value of current object in the array to our variable result. By looking back with your new found knowledge you should be able to understand the logic of the For loop and what it is doing. In short, the loop is selecting number argument in the array and adding it to a running total. 

We are not quite finished. The result variable is still undefined. Logically, the result variale should start at 0, as if there are no number arguments given, the answer is 0. So At the top of your script:

    var result = 0;
  
And then we use our `console.log()` to print out the result variable.

    console.log(result);
    
>  {appname} will be supplying arguments to your program when you run `{appname} verify program.js` so you don't need to supply them yourself. To test your program without verifying it, you can invoke it with `{appname} run program.js`. When you use `run`, you are invoking the test environment that {appname} sets up for each exercise.

So to run with some arguments try:

``` sh
$ learnyounode program.js 1 2 3 4
```

Which should give you the result 10. And verify with:

``` sh
$ learnyounode verify program.js
```
# Recap

So to recap:

1.  `process.argv` gives an array of the command line arguments.
2.  A For loop consists of a variable declaration, a condition, a task to run if the condition is true and another task to run after this to close the loop.
3. You can declare variables using var {variablename} = {value}
4. You can use inequality symbols for your conditional statement
5. `++` adds 1 to the value of the variable and reassigns this new value to the variable.
6. `+=` adds the value on the left to the value of the variable on the right and reassigns this.
7. `Number()` returns the number value of the contents fo the brackets.
8. Using the square brackets [] you can select a specific item in an array.

That's all for this tutorial.