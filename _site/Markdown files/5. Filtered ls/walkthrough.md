# Exercise 5 - Filtered ls

This exercise will continue to use asynchronous methods. Directory manipulation will be a part of this. 

# Problem

> Create a program that prints a list of files in a given directory, filtered by the extension of the files. You will be provided a directory name as the first argument to your program (e.g. '/path/to/dir/') and a file extension to filter by as the second argument.

> For example, if you get 'txt' as the second argument then you will need to filter the list to only files that **end with .txt**.

> The list of files should be printed to the console, one file per line. You **must** use asynchronous I/O.

So for this we need to access command line arguments... again. Then we need to be able o read the contents of a directory and distinguish between files based on the extension. Shall we have a look at those lovely hints?

# Hints

> The `fs.readdir()` method takes a pathname as its first argument and a callback as its second. The callback signature is:

```js
function callback (err, list) { /* ... */ }
```

> where `list` is an array of filename strings.

> Documentation on the `fs` module can be found by pointing your browser here:
  {rootdir:/node_apidoc/fs.html}

> You may also find node's `path` module helpful, particularly the `extname` method.

> Documentation on the `path` module can be found by pointing your browser here:
  {rootdir:/node_apidoc/path.html}
  
So the hints have introduced a few new ideas that we need to research. First off is the `readdir()` process. Not dissimilar to `readFile`, it can read a firectory using the filesystem module. Using the standard method of node we have a callback function, which the second argument, our data being `list` which is an array of filenames as strings. 

We really need to take a look at the documentation on `path.extname`.

## path.extname(p)

> Return the extension of the path, from the last '.' to end of string in the last portion of the path. If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string. Examples:

```js
path.extname('index.html')
// returns
'.html'

path.extname('index.coffee.md')
// returns
'.md'

path.extname('index.')
// returns
'.'

path.extname('index')
// returns
''
```

So this allows us to look at the extension of each file in our `fs.readdir`.

Lets have a go at writing the script. First create our modules as variables:

```js
var fs = require('fs')
var path = require('path')
```

Then use the asynchronous process `fs.readdir`:

```js
fs.readdir(pocess.argv[2], function(err, list) {
  doSomething;
})
```

Now we want to read each file name for it's extension. So we can use a `forEach`:

```js
fs.readdir(process.argv[2], function (err, list) {
  list.forEach(function (file) {
    doSomething;
  })
})
```

Let me explain `forEach`. The `forEach()` method executes a provided function once per array element. The sytax to follow is:

```js
array.forEach(callbackFunction(, argument) {})
```

Full documentation can be found at [Mozilla.org](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach). 

So for each filename in the directory we want to check for the file extension that we specify in the command line.

```js
fs.readdir(process.argv[2], function (err, list) {
  list.forEach(function (file) {
    if (path.extname(file) === '.' + process.argv[3])
      console.log(file)
  })
})
```

Enter the `if` statement. 

## if statements

I don't really need a subheading for this. 

```js
if (condition)
  doSomething
```

So if the condition is true, do something. If not... don't. `if` statements can be more complicated by providing `else` or `else if` but that is beyond the scope of this exercise.

So our code reads, if the `path.extname()` of our `file` is equal to (`===`) the extension specified in our console, `console.log` the file name. There is also an extra bit: `'.' +` is simply adding the full stop for our file extension. Essentially you could give the full stop in your command line and omit this part of the code. So if the extension is the same as `.(process.argv[3])` then log it. 

# Recap

1.  `readdir()`: reads the contents of a directory (the file names).
2.  The `path` module allows gives access to file directory structure and manipulation.
3.  `extname`: returns the part of a string that comes after the final period (fullstop), including the period itself.
4.  `forEach`: executes a specified function for each element in an array.
5.  an `if` statement consists of a condition to be met and a function to execute should the condition be true.
6.  `===`: operator to say 'equal in every way'. This is not used for assigning values. This is used in place of inequalities. `===` specifically means to be entirely the same. Not to be confused with `==` or `=`. Its opposite is `!==` to mean 'not equal'.
7.  `+`: prefixes the string on the right hand side with the string on the left hand side. Also used in math.

That's all for this tutorial.