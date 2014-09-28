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
