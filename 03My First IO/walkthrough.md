# Exercise 3 - My First I/O

In this exercise you are going to be using a sychronous program to access a file system.

# Problem

> Write a program that uses a single **synchronous** filesystem operation to read a file and print the number of newlines it contains to the console (stdout), similar to running `cat file | wc -l`.

> The full path to the file to read will be provided as the first command-line argument.

Before we dive in, lets understand the word synchronous. Anyone who has done some background reading on node.js knows that the beauty of node is the ability to run asynchronous functions. So why are we making a program that doesn’t take advantage of this? Just to make a point, thats why!

So, we need to be able to access the command line arguments. We need to be able to access the contents of a file. We need to be able to search the file for how many newlines it has. Lets take a look at hints given to us.

# Hints

Node has a simple module loading system. In Node, files and modules are in one-to-one correspondence.

> To perform a filesystem operation you are going to need the `fs` module from the Node core library. To load this kind of module, or any other "global" module, use the following incantation:

```js
var fs = require('fs')
```

So this is the first line of our script. Sometimes they just give it away! In short, this module loads all the required dependencies the program needs for filesystem functions.

> Now you have the full `fs` module available in a variable named `fs`.

> All synchronous (or blocking) filesystem methods in the `fs` module end with 'Sync'. To read a file, you'll need to use `fs.readFileSync('/path/to/file')`. This method will *return* a `Buffer` object containing the complete contents of the file.

Seeing as we are reading a file that has been given as an argument in the command line, we can use our `process.argv` function that we used in the previous exercise.

    var contents = fs.readFileSync(process.argv[2])
    
So, accessing the filesystem module, use the command `readFileSync()` on the 3rd item argument in our command line which should be a file directory. Then assign the contents of this file to the variable `contents`.

> Documentation on the `fs` module can be found by pointing your browser here:
  {rootdir:/node_apidoc/fs.html}

> `Buffer` objects are Node's way of efficiently representing arbitrary arrays of data, whether it be ascii, binary or some other format. 
> `Buffer` objects can be converted to strings by simply calling the `toString()` method on them. e.g. `var str = buf.toString()`.

> Documentation on `Buffer`s can be found by pointing your browser here:
  {rootdir:/node_apidoc/buffer.html}
  
Now we need to search the contents for new lines. The hints gives us a good tip on that.

> If you're looking for an easy way to count the number of newlines in a string, recall that a JavaScript `String` can be `.split()` into an array of substrings and that '\n' can be used as a delimiter. Note that the test file does not have a newline character ('\n') at the end of the last line, so using this method you'll end up with an array that has one more element than the number of newlines.

Using this information we can write our next line of code:

    var lines = contents.toString().split('\n').length - 1
    
Let's go through this. 

1. `var lines`: new variable.
2. `contents.toString()`: converts the array contents into a string.
3. `.split('\n')`: Split this string back into an array, each split should be at a newline (using the newline character '\n').
4. `.length`: Return the length of the array.
5. `-1`: Deduct 1 from the result as the length will be 1 more than the number f newline characters as stated in the hints.

Finally you can `console.log(lines)`.

You can now run your program on any file in your directory using:

    $ node program.js {filename}
    
And you can verify using:

    $ learnyounode verify program.js
    
Completing the excersie.

# Recap

1. `require` lets the machine know to use a specific module for your code to work
2. `readFileSync()` returns the contents of a file as a buffer/array object.
3. `toString` converts an array/buffer into a string
4. `split()` splits a string into an array, splitting up objects based on the contents of the brackets ().
5. `\n ` is the newline character in a file