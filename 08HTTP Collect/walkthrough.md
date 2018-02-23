# Exercise 8 - HTTP Collect

More on HyperText Transfer Protocol GET requests.

# Problem

> Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Collect **all** data from the server (not just the first "data" event) and then write two lines to the console (stdout).

> The first line you write should just be an integer representing the number of characters received from the server and the second line should contain the complete String of characters sent by the server.

So for this problem we need to collect data from the server, manipulate what we recieve and print it out to the console. This shouldn't be too difficult. Lets look at the hints.

# Hints

> There are two approaches you can take to this problem: 

> **1)** Collect data across multiple "data" events and append the results together prior to printing the output. Use the "end" event to determine when the stream is finished and you can write the output.

> **2)** Use a third-party package to abstract the difficulties involved in collecting an entire stream of data. Two different packages provide a useful API for solving this problem (there are likely more!): `bl` (Buffer List) and `concat-stream`; take your pick!

  <http://npm.im/bl>
  <http://npm.im/concat-stream>

> To install a Node package, use the Node Package Manager `npm`. Simply type:

```sh
$ npm install bl
```

> And it will download and install the latest version of the package into a subdirectory named `node_modules`. Any package in this subdirectory under your main program file can be loaded with the `require` syntax without being prefixed by './':

```js
var bl = require('bl')
```

> Node will first look in the core modules and then in the `node_modules` directory where the package is located.

> If you don't have an Internet connection, simply make a `node_modules` directory and copy the entire directory for the package you want to use from inside the {appname} installation directory:

  {rootdir:/node_modules/bl}
  {rootdir:/node_modules/concat-stream}

> Both `bl` and `concat-stream` can have a stream *piped* in to them and they will collect the data for you. Once the stream has ended, a callback will be fired with the data:

```js
response.pipe(bl(function (err, data) { /* ... */ }))
// or
response.pipe(concatStream(function (data) { /* ... */ }))
```

> Note that you will probably need to `data.toString()` to convert from a Buffer.

> Documentation for both of these modules has been installed along with {appname} on your system and you can read them by pointing your browser here:

  {rootdir:/docs/bl.html}
  {rootdir:/docs/concat-stream.html}
  
For this walkthrough we will be using the 2nd method. So lets start with the `bl` module or *buffer list*. To explain this module I will quote the documentation at it's very best:

> *"A Node.js Buffer list collector, reader and streamer thingy."*

So requiring our thingy:

```js
var http = require('http')
var bl = require('bl')
```

Simple. Next we start our `get` request as we did previously:

```js
http.get(process.argv[2], function (response) {
  doSomething;
})
```

We now need our stream to be piped to us, so following the notation in the hints:

```js
http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    doSomething;
  }))  
})
```

We want an early error callback:

```js
http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err)
      return console.error(err)
    doSomething
  }))  
})
```

Now instead of just console logging the data, we want to manipulate it. The data is currently presented as a buffer/array. We want to string it, log its length and log it as a string:

```js
http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err)
      return console.error(err)
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))  
})
```

So we are now piping our stream into our `bl` module which is now retrieving data from a url and presenting it to us in an array. We then stringify this array, log its length and then log the data as a string. 

This walkthrough has skirted over a very important topic in your learning. Streaming. For true understanding of streaming in node I suggest further research. There is a very large section in ["Professional Node.js" by Pedro Teixeira](http://www.amazon.co.uk/dp/1118185463). But for this tutorial I will simply quote the node documentation:

## Stream

> `Stability: 2 - Unstable`

A stream is an abstract interface implemented by various objects in Node. For example a request to an HTTP server is a stream, as is stdout. Streams are readable, writable, or both. All streams are instances of EventEmitter

You can load the Stream base classes by doing require('stream'). There are base classes provided for Readable streams, Writable streams, Duplex streams, and Transform streams.

# Recap

1.  You can use both the `bl` and `concat-stream` modules for streaming in node.
2.  You pipe your stream using the `.pipe()` method on your module. When the stream ends, a callback is fired.
3.  Data collected by the module will be returned as an array.

Whilst not much new stuff has been introduced it is important to reiterate just how large the topic of streaming is. I may, by popular demand only, provide a tutorial for streaming in the future. That's all for this tutorial.
