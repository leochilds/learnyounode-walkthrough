# Exercise 6 - Make it Modular

It is at this point in learnyounode that things can get very tricky. The task requires a huge leap in understanding of node. Using modules is a large part of software development, and writing your own is a prerequisite of being a *developer*. So far you have had the pleasure of using modules incorporated in node, but someone had to make those modules for you to use. Time to step into their shoes. 

# Problem

This is quite a long script, but read through all of it and don't get hung up on parts you don't understand. We will go over everything in due course.

> This problem is the same as the previous but introduces the concept of **modules**. You will need to create two files to solve this.

> Create a program that prints a list of files in a given directory, filtered by the extension of the files. The first argument is the directory name and the second argument is the extension filter. Print the list of files (one file per line) to the console. You **must** use asynchronous I/O.

> You must write a *module* file to do most of the work. The module must *export* a single function that takes **three** arguments: the directory name, the filename extension string and a callback function, in that order. The filename extension argument must be the same as was passed to your program. i.e. don't turn it into a RegExp or prefix with "." or do anything else but pass it to your module where you can do what you need to make your filter work.

> The callback function must be called using the idiomatic node(err, data) convention. This convention stipulates that unless there's an error, the first argument passed to the callback will be null, and the second will be your data. In this case, the data will be your filtered list of files, as an Array. If you receive an error, e.g. from your call to  `fs.readdir()`, the callback must be called with the error, and only the error, as the first argument.

> You **must** not print directly to the console from your module file, only from your original program.

> In the case of an error bubbling up to your original program file, simply check for it and print an informative message to the console.

> These four things is the contract that your module must follow.

> 1. Export a single function that takes exactly the arguments described.
> 2. Call the callback exactly once with an error or some data as described.
> 3. Don't change anything else, like global variables or stdout.
> 4. Handle all the errors that may occur and pass them to the callback.

> The benefit of having a contract is that your module can be used by anyone who expects this contract. So your module could be used by anyone else who does learnyounode, or the verifier, and just work.

What we need then is to replicate the previous exercise, but putting our script into a module. This can be quite scary, and looking at the official solution is very unlikely to help you understanding at this point, so please don't be tempted just yet. Let's take a look at the hints.

# Hints

> Create a new module by creating a new file that just contains your directory reading and filtering function. To define a *single function* *export*, you assign your function to the `module.exports` object, overwriting what is already there:

```js
module.exports = function (args) { /* ... */ }
```

> Or you can use a named function and assign the name.

> To use your new module in your original program file, use the `require()` call in the same way that you `require('fs')` to load the `fs` module. The only difference is that for local modules must be prefixed with './'. So, if your file is named mymodule.js then:

```js
var mymodule = require('./mymodule.js')
```

> The '.js' is optional here and you will often see it omitted.

> You now have the `module.exports` object in your module assigned to the `mymodule` variable. Since you are exporting a single function, `mymodule` is a function you can call!

> Also keep in mind that it is idiomatic to check for errors and do early-returns within callback functions:

```js
function bar (callback) {
  foo(function (err, data) {
    if (err)
      return callback(err) // early return

    // ... no error, continue doing cool things with `data`

    // all went well, call callback with `null` for the error argument

    callback(null, data)
  })
}
```

The best way to aproach this would be to write you program assuming your module has already been written to work. Then create your module. For those who are interested in testing (and you all should be!) this method makes it easy to write a test from the start. Then you just have to get the test to pass. So starting off our program:

```js
var filterFn = require('./program_filter.js')
```

For the purpose of clarification, filterFn is shorthand for filter Function. So first thing we have done is require our own module that we still haven't written yet. As per the hints, I have prefixed the filename with './'.

We now need to use our module on our command line arguments as per the instructions. Taking the directory name, the extension and the callback function as our 3 arguments.

```js
filterFn(process.argv[2], process.argv[3], function (err, list) {
  doSomething;
})
```

If we are writing a test, our test will be checking if this works. Of course it doesn't, the module doesn't exist. Next we need to use our error handler properly. So, if statement:

```js
filterFn(process.argv[2], process.argv[3], function (err, list) {
  if (err)
    return console.error('There was an error:', err)
})
```

So, if we have an error we should get back an error log. Now we need to `console.log` the filenames that have the correct extension. By refering to the previous exercise we want a `forEach` to `console.log` all the filenames. But we aren't allowed to put any other manipulation here. So just log our variable `file`:

```js
filterFn(process.argv[2], process.argv[3], function (err, list) {
  if (err)
    return console.error('There was an error:', err)

  list.forEach(function (file) {
    console.log(file)
  })
})
```

This is still pretty useless without our module, but it does provide some clarity in terms of what is supposed to be happening. Comparing this to the official solution, `process.argv[2]` and `process.argv[3]` have been assigned to the variables `dir` and `filterStr` respectively. This serves the purpose of providing our arguments for the `module.export` function in our module.

We now need to write our module. Straight away, for our module to work we know we need the filesystem module and path module so:

```js
var fs = require('fs')
var path = require('path')
```

Yes, our module requires modules. I can see an inception reference on the horizon. Easy bit over. Following the rules of our export we can write `module.export` with 3 arguments that exports our function for use in our program.

```js
module.export = function (dir, filterStr, callback) { 
  doSomething;
}
```

Assigning the command line arguments to variables made this step relatively straight forward. We have our 3 arguments that we had to have, the directory, the extension and the callback function. Next up we want to do something... and we have already done it before, in the previous exercise. 

```js
fs.readdir(dir, function (err, list) {
    list = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr
    })
})
```

So we can `readdir` our directory stored in the variable `dir`. We have our function with the `err` argument and data argument `list`. We've now introduced a new function `.filter()`. The `.filter()` method creates a new array with all elements that pass the test implemented by the provided function. So our test is the same as our previous if condition `path.extname(file) === '.' + filterStr`.

Full documentation on `.filter()` can be found at [mozilla.org](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). The reason for using the filter method instead of our previous if statement is because under the conditions of the contract we mustn't log the file names from the module. This must be done in our program. So we store the information in an array so that we can call upon it later in our program. Remember the lines:

```js
list.forEach(function (file) {
    console.log(file)
  })
```

Effectively, logging each element in our `list` variable. We still need to put in our error callback as specified in the contract.

```js
module.exports = function (dir, filterStr, callback) {

  fs.readdir(dir, function (err, list) {
    if (err)
      return callback(err)

    list = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr
    })

    callback(null, list)
  })
}
```

So if there is an error, return the callback `err`, which is our early callback as specified in the hints. If there is no error, later `callback` the value `null` for our `err` argument as per the hints.

We should now have 2 files. One is our module and the other is our program. Our program can call upon our module and use it as a function to perform the task as per the last exercise. We have also written a response to errors. You can run your program using:

```cs
$ node program.js directory ext
```

Or verify with:

```cs
$ learnyounode verify program.js
```

# Recap

This has been quite a long and difficult exercise, and grasping some of the concepts can be quit difficult. I suggest further reading of modules in node documentation and further practice can be carried out by writing modulated versions of the previous exercises.

1.  Using contracts for modules is beneficial for collaborative development.
2.  When writing your own modules you'll need to prefix the name with './'.
3.  Your `require` your modules the same way as nodes own modules.
4.  `module.export`: allows your to export a function from your module.
5.  `.filter()`: creates an array of all the elements that pass a test provided by your function
6.  use `if (err)` early on in your script for early error callback for efficiency
7.  make sure to provide a `null` value when there is no error.

That's all for this walthrough.
