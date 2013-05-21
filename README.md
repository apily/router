# router

Router component

## Installation

    $ component install apily/router


## API

### Router()
Create a router

```js
var router = new Router();
```

### Router#get(String:path, Function:callback...)

```js
router.get("#users/:user_id", function (req) {
  var params = req.params;
  console.log('Hello ' + params.user_id + '!');
});
```

```js
router.get("#users/:user_id/books/:book_id", 
  function (req, next) {
    var params = req.params;
    var user_id = params.user_id;
    var book_id = params.book_id; 
    req.hello = 'Hello ' + user_id + '!' 
      + 'Read the book ' + book_id + '!';
    next();
  },
  function (req) {
    console.log(req.hello);
  }
);
```

### Router#dispatch(String:path)

```js
router.dispatch("#users/enrico");
```

```js
router.dispatch("#users/enrico/books/123");
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
