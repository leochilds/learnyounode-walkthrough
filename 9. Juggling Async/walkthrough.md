# Exercise 9 - Juggling Async

This exercise continues using http, but also brings in some of the previous knowledge you should have gained from the first few exercises. If you have understood everything so far this task should be relatively straightforward. 

# Problem

> This problem is the same as the previous problem (HTTP COLLECT) in that you need to use `http.get()`. However, this time you will be provided with **three** URLs as the first three command-line arguments.

> You must collect the complete content provided to you by each of the URLs and print it to the console (stdout). You don't need to print out the length, just the data as a String; one line per URL. The catch is that you **must** print them out in the same order as the URLs are provided to you as command-line arguments.

So for this exercise we need to collect data from several urls, and as we recieve the data we need to store it without logging it. Then we need to be able to log the data only after everything has been collected. Lets look at the hints.

# Hints

> Don't expect these three servers to play nicely! They are not going to give you complete responses in the order you hope, so you can't naively just print the output as you get it because they will be out of order.

> You will need to queue the results and keep track of how many of the URLs have returned their entire contents. Only once you have them all, you can print the data to the console.

> Counting callbacks is one of the fundamental ways of managing async in Node. Rather than doing it yourself, you may find it more convenient to rely on a third-party library such as [async](http://npm.im/async) or [after](http://npm.im/after). But for this exercise, try and do it without any external helper library.

So they aren't really giving us anything new. Just some friendly advise is all. Just as in the revious task we need our `bl` and `http` modules:

```js
var bl = require('bl')
var http = require('http')
```

We are going to need 2 main functions. One is to stream the data from the 3 urls and the other is to print out the data once it has been recieved. Lets call the stream function "httpGet" and the print function "printResults". Seeing as the `httpGet` will be calling on `printResults` we should write `printResults` out first.

We can write our function to print out the elements of an array one line at a time. So our array can be a variable, lets call it `results`. The results variable will contain the data from each url. Then we can use a `for` loop to print out the results. So first create a variable and assign it an empty array:

```js
var results = []
```
Then our function containing a `for` loop:

```js
function printResults () {
  for (var i = 0; i < 3; i++)
    console.log(results[i])
}
```

We now need to write out `httpGet` function. We need to open a stream for each url, collect the data and then store it in the results array. How can we do this to all 3? We can create a for loop to go through each url, collect the data, and then add it to the corresponding position in the array. So the for loop can be simple, like this:

```js
for (var i = 0; i < 3; i++)
  httpGet(i)
```
So, if `i` is less that 3, console log the element in position `i`. Simple. No we can start writing our `httpGet` function around the `i` or `index` parameter.

```js
function httpGet (index) {
  doSomething
}
```

Our function, as part of the for loop will scrool through index 0, 1 and 2. We can use this as we have done before to access each part of a command line argument that we want. Skipping out the first 2 arguments:

```js
function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    doSomething
  })
}
```

We now perform a `http.get` on each url in the command line. Now pipe the stream to collect the data, incuding the early error callback:

```js
function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err)
    }))
  })
}
```

Now we need to string the data, and add it to the results array in the corresponding position. We can do this using our index:

```js
function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err)

      results[index] = data.toString()
    }))
  })
}
```

So far our program is storing the data from the 3 urls in our command line. We need to now somehow use our `printResults` function to print out the data. But it has to all be done in the correct order, all at once. So we need to wait for all the data to be collected and stored. We can use a count mechanism to do this.

First declare the count variable:

```js
var count = 0
```

Then we add instructions to increase the count by 1 when the data has been stringed and added to the results array:

```js
function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err)

      results[index] = data.toString()
      count++
    }))
  })
}
```

So after the data is stored we increase the count variable by 1.

Now we need to carryout our `printResuts` function when all the data is stored. So at 3 count:

```js
function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err)

      results[index] = data.toString()
      count++

      if (count == 3)
        printResults()
    }))
  })
}
```

And you've done it. Our `printResults` function now loops through our results array, printing off each element which is a string of data from the corresponding urls in the same order they were passed to the console. 

# Recap

1.  Embed functions for easy reuse.
2.  Asynchronous processes happen at the same time, so faster processes finish sooner. 
3.  You need to manage your asynchronous processes, so that your functions act in the corret order.

That's all for this walkthrough.