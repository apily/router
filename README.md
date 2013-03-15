# router

Router component

## Installation

    $ component install apily/router

Remember to build your component doing

    $ component build

This will generate a file in build/build.js that you can import in your HTML file with:

    <script type="text/javascript" src="build/build.js"></script>
    <script type="text/javascript">
      var Router = require("apily-router");
      ...
    </script>

## Usage
Setting the router:

    var router = new Router();
    
    router
      .route('#users', show_users)
      .route('#users/:name', show_user)
      .route('#users/:name/profile', function(name) {
        console.log("You are watching " + name + "'s profile");
      });

You can trigger a change in route simply with

    window.location = '#users/federico/profile';
    // You are watching federico's profile
    window.location = '#users/nicola/profile';
    // You are watching nicola's profile

## API

### Router()
Create a router

```js
var router = new Router();
```

### Router#route(route, callback)
Add a route to `this`

```js
router.route("#here", callback);
```

> **Note**  
> `apily/router` does not support HTML5 `pushState` yet.  
> You have to include `#` as prefix in your routes.

### Router#route_to_regexp(route)
Convert a route string into a regular expression, suitable for matching against the current location hash.

```js
router.route_to_regexp("#users/:name/profile")
// /^\#users/([^/]+)/profile$/
```

### Router#extract_params(regexp, fragment)
Given a regexp, and a URL fragment that it matches, return the array of extracted parameters.

```js
router.extract_params(/^\#users/([^/]+)/profile$/, '#users/nicola/profile')
// ["nicola"]
```

## License

(The MIT License)

Copyright (c) 2013 Enrico Marino and Federico Spini

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
