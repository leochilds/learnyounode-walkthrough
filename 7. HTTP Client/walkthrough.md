# Exercise 7 - HTTP Client

We are now moving into the area of HTTP which stands for HyperText Transfer Protocol. The is the scheme that most websites use for deliver of data between a server and a client. Other schemes include https which is the secure version and mailto which is for sending emails. This exercise will be looking at the client.

# Problem

> Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Write the String contents of **each** "data" event from the response to a new line on the console (stdout).

So, some new material here. We need to be able to send requests using the http scheme. Lets look at the hints.

# Hints

> For this exercise you will need to use the `http` core module.

> Documentation on the `http` module can be found by pointing your browser here:
  {rootdir:/node_apidoc/http.html}

> The `http.get()` method is a shortcut for simple GET requests, use it to simplify your solution. The first argument to `http.get()` can be the URL you want to GET, provide a callback as the second argument.

> Unlike other callback functions, this one has the signature:

```js
function callback (response) { /* ... */ }
```

So, we require a different module. Nothing new there. We also can use a new method `get()` which takes 2 arguments, our url and a callback. And our callback function is slightly different. So we can hit the ground running with:

```js
var http = require('http')

http.get(process.argv[2], function (response) {
  doSomething;
})
```

Now we need to assign our event handlers to the response argument.

```js
var http = require('http')

http.get(process.argv[2], function (response) {
  response.on('data', console.log)
  response.on('error', console.error)
})
```

So you can see the `.on()` method in this case takes 2 arguments, the data/error and the function to perform. To make this a complete http get request we can add the correct encoding.

```js
var http = require('http')

http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
})
```

So by running your program using:

```cs
$ node program.js url
```

You can see the response to your request printed out in the command line. This will provide the either a specifi response set to handle these requests or it will send you the html, or the HyperText Markup Language, which is exactly what HTTP is supposed to do.

# Recap

1.  `http`: is the required module for http requests.
2.  `.get`: is one http method, which is used for making requests to a server.
3.  The `.get` callback function doesn't follow the same node format that we have previously seen. 
4.  `.on()`: assigns our event handlers.
5.  Its good practice to include the used encoding. You can't always get away with ommitting it like many people do in html documents.