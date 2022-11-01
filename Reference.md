# Reference

Use this doc as a reference for common APIs and JavaScript methods and patterns.

# JavaScript

Basic JS language stuffs:

```javascript
// Variables

// Global variable (in the file)
var hello = "Hello";

// Local variable
let world = "World";

// Constant, will throw an exception if you try to change this.
const text = hello + " " + world;

// If statements
if (hello == "Hello") {
    // ...
} else if (world == "Hello") {
	// ...
} else {
    // ...
}
```

JavaScript types

```javascript
// Bool, Number
let bool = true;
let number = 3.1415;
let numberInt = 42;

// String
let string = "Text here";
let len = string.length; // 9
// Embed a variable in a string
let b = `The user input is ${string}`;

// Get the first 3 characters of the string
let start = string.slice(2);
// Get the middle characters
let middle = string.slice(4, 5);

// Replace string contents
let newString = string.replace("Text", "User"); // "User here"
```

Functions

```javascript
function logHello() {
	console.log("Hello World")
}

// Alternatively
const logHello = () => {
    console.log("Hello World")
}

// We can also pass functions as parameters
function divide(divisor, dividend, callback) {
    callback(dividend/divisor);
}

// When we use we give it a new function to call with the answer.
divide(function (answer) {
    console.log(answer)
})
```



#### Arrays

```javascript
let array = [1,2,3,4,5];
array.length;
let firstElement = array[0]
```

Add elements to the array

```javascript
// Append to the array
array.push(6); // [1,2,3,4,5,6]
// Add to the beggining
array.unshift(0); // [0,1,2,3,4,5,6]
```

Remove elements from the array

```javasc
// Pop the last element and return it
let lastElement = array.pop()

// Pop the first element and return it
let firstElement = array.shift()
```

Loop through an array, or filter it

```javascript
// Loop through an array's elements
array.forEach((element) => {
    console.log(element)
})

// Filter an array
let filtered = array.filter((element) => {
    return element > 2;
}) // [3,4,5,6]
```

Find an element or the element's index in the array

```javascript
// Find an element in an array
// This will either return the element found or null
let foundElement = array.find((element) => {
    return element == 2
})

// Finds the first index of an element in an array
// Should return `1`
let firstIndex = array.indexOf((element) => {
    return element == 2
})
```

Get a range of an array

```javascript
let firstThreeElements = array.slice(2); // [0,1,2]
let lastThreeElements = array.slice(-3); // [4,5,6]
let middleThreeElements = array.slice(2, 5) // [2,3,4]
```



# NodeJS & ExpressJS

To run a NodeJS app:

```bash
node index.js
```

**But!** For our app, we can use:

```bash
npm run dev
```

To make the app reload whenever we make a change. This is just a little syntax sugar for a script that does this.

### Express

We're using [ExpressJS](https://expressjs.com) as a wrapper around NodeJS. Express makes things simpler to implement and gives us a bunch of handy tools.

### Routes

>   Browsers will always send a GET request, APIs can use verbs like POST and PATCH to specify other meanings for their paths, but for any UI routes we'll always use GET

Declaring a route to respond to a request at a path:

```javascript
// Responds to the HTTP request
// GET /home
app.get("/home", (req, res) => {
    // 
})
```

For routes that have a parameter, such as `/room/1` or `/room/2` we can use that parameter like so:

```javascript
// Declare the parameter using the :{parameter name} syntax in your path
// The parameter name will match the name in your request object.
app.get("/room/:roomID", (req, res) => {
    console.log(req.params.roomID)
})
```



### Requests

Servers respond to requests. In each route you declare, you'll be given a request object that holds data about the request like the URL, path, parameters, request body, HTTP verb, etc. Below is a short list of useful variables on the request object.

```javascript
req.body // Any data sent with the request
req.params // Path parameters
req.session // We're using session cookies, so this contains our user data
req.query // Query parameters
```



### Responses

Responses are what we use in Express to send data back to a client. Below are some common variables and methods on responses.

```javascript
res.status(200).send() // Sends an empty "OK" message
res.sendStatus(200) // Same as above, some people like this one though

res.send("Hello World") // Sends some text in response (By default sends a 200 status code)
// Sends an object in JSON format, will turn this into a JSON string automatically. We can just pass a javascript object.
res.send({
    text: "Hello World"
}) 

// we can also send a variable, which will send the contents of that variable to the client.
let data = [1,2,3,4,5,6]
res.send(data)

// Redirect the request to another path
res.redirect("/home")
```

We also use the response object to render HTML for the user. See below.

### Render HTML

For our app we're using the [Handlebars](https://www.npmjs.com/package/handlebars) library to add data to HTML. This library gives us a small API for rendering HTML in a response:

In our app we start with a couple `.handlebars` files in the `views` folder. Each of these files is a different view we can render. For instance, if a `home.handlebars` file exists in that folder. I can use `res.render("home")` to send a rendered version of that file. If you add a file to that folder, it will be made available in your JavaScript code.

```javascript
// Render a handlebars view named "home"
res.render("home")

// Render the same view, but add data to the renderer
res.render("home", {
	rooms: [
       	...
    ]
});
```

To add data to the view so it can be rendered, we need to use the second method above to give handlebars.js data to load. If you want to learn more about what this is doing internally, I highly suggest checking out handlebars.js and looking through their tutorials. I've left the HTML and CSS parts out of this workshop for brevity and to focus on the server-side.

### Storage

A `Storage` class is provided with the starter project. This class stores data in a simple file on your computer. It has a few methods that you can use to store and retrieve user data. In a real app, this might be replaced by something that talks to a database, but the API will be similar in that case.

```javascript
// Import the storage class from it's file. This path is relative to the 
// file you're importing from.
const storage = require("../storage/db");

// Gets all users
storage.getUsers()
// Gets a specific user
storage.getUser(username)
// Creates or saves a user given their username and password
await storage.saveUser(username, password)

// Gets a specific room object
storage.getRoom(roomID)
// Gets an array of rooms for a specific user
storage.getRoomsForUser(username)
// Creates a room for a list of user IDs, returns the new room's ID.
await storage.createRoom(userIDs)

// Gets an array of messages for a specific room
storage.getMessages(roomID)
// Saves a new message for a user and a room.
await storage.saveMessage(username, roomID, content)
```

Below are the schemas for each object in the database

>   You should never have to manually create a user, room, or message. Instead use the methods provided by the storage class. These schemas are here to help in case you need to debug.

Users

```javascript
{ 
    "username": "",
    "password": "",
    "rooms": [
        // Room IDs
    ] 
},
```

Rooms

```javascript
{
	"id": "1",
	"users": [/* Array of user IDs */],
	"messages": [
		// Array of messages
	]
}
```

Messages

```javascript
{ 
    "messageID": // Randomly generated,
    "user": "username",
    "content": "Hello World"
}
```