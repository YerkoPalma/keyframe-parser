# keyframe-parser
[![Build Status](https://img.shields.io/travis/YerkoPalma/keyframe-parser/master.svg?style=flat-square)](https://travis-ci.org/YerkoPalma/keyframe-parser) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

Parse a valid css keyframe string into a Keyframe Object for the Web Animations API.
## Usage

```js
var keyframe = require('keyframe-parser')
var animation = require('nanoanimation')

var move = animation(keyframe`@keyframes move {
  from {
    top: 0px;
  },
  to {
    top: 100px;
  }
}`, 1000)

move(document.getElementById('elem'), () => console.log('done'))
```

## API
### `var keyframe = require('keyframe-parser')`

A single function is exported and is a [tagged template literal][tagged_templates].
Pass in a string for a css keyframe animation definition, and it will return a [Keyframe Object][keyframe_formats]
to be used with the [Web Animation API][web_animation].

## License
[MIT](/license)

[tagged_templates]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates
[keyframe_formats]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
[web_animation]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API
