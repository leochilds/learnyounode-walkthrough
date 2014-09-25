# Exercise 4 - My First Asynchronous I/O

This exercise is the same as the previous exercise, except we are going to do it far more efficiently. In the previous exercise, the script is read and executed 1 line at a time. What this means is that if there is another function to be performed after the readFileSync, this new function will have to wait for that to finish. If the document being read is very large, this could take quite some time.

In an asynchronous app, an event loop runs, which means that the readFile function will not block other functions from happening, it will just continue working whilst the rest of the script is loaded. 

# Problem

> Write a program that uses a single **asynchronous** filesystem operation to read a file and print the number of newlines it contains to the console (stdout), similar to running `cat file | wc -l`.

> The full path to the file to read will be provided as the first command-line argument.

Easy peasy because you've already done this. SO what do we need? We need everything n the previous exercise, except we want to use an asynchronous process instead of readFileSync. Lets look at the hints given to us.

# Hints

> The solution to this problem is *almost* the same as the previous problem except you must now do it **the Node.js way**: asynchronous.

> Instead of `fs.readFileSync()` you will want to use `fs.readFile()` and instead of using the return value of this method you need to collect the value from a callback function that you pass in as the second argument.

So use `readFile(process.argv[2])` instead of `readFileSync(process.argv[2])`. But then we need a callback function to pass a second argument through.

> Remember that idiomatic Node.js callbacks normally have the signature:

```js
function callback (err, data) { /* ... */ }
```

Thats not really giving us much. Lets look at the documentation.

# fs.readFile(filename, [options], callback)

- `filename` String
- `options` Object
  - encoding `String | Null` default = `null`
  - flag `String` default = `'r'`
- callback `Function`

Asynchronously reads the entire contents of a file. Example:

    fs.readFile('/etc/passwd', function (err, data) {
      if (err) throw err;
      console.log(data);
    });

The callback is passed two arguments `(err, data)`, where `data` is the contents of the file.

If no encoding is specified, then the raw buffer is returned.

And thats the documentation. By the way, the first argument `err`, is the error handler.

So, we can try:

```js
fs.readFile(process.argv[2], function (err, contents) {
doSomethingWithThisData;
})
```

We are getting closer. What is it that we want to do with the data after it has been read? We want to find out how many newlines are in it. So using our code from the previous exercise we can put in:

```js
fs.readFile(process.argv[2], function (err, contents) {
var lines = contents.toString().split('\n').length - 1;
console.log(lines);
})
```

Now, we have an asychronous process doing the same thing as before. If you have a look at the official solution, you will see that `process.argv[2]` has been assigned to the variable `file`. This is could for reading the code and easily reusing the  file name. 

If you are having problems, make sure you delcared your fs variable. You still need the file system module.

# Recap

1. An asynchronous process allows the script to continue running.
2. The `readFile()` function is the asynchronous version of `readFileSync()`.
3. The `readFile()` takes the file name as its first parameter and a callback function as its last parameter. (You can have an options parameter but this si beyond the scope of this walkthrough).
4. The callback function takes 2 parameters, the error handler `err` and the data parameter which is your file contents.

That's all for this walkthrough.