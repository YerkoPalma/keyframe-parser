var xtend = require('xtend')

function Keyframe (strings) {
  var arglen = arguments.length
  var result = ''
  for (var i = 0; i < arglen; i++) {
    var arg = arguments[ i + 1 ] || ''
    result += strings[i] + arg
  }
  var keyframes = []
  var regexMainBlock = /\s*@keyframes\s*(\w*)\s*{(.*)}/
  var regexBlocks = /[\w+,\s|\d+%,\s]*\s*{\s*([\w\-\d.:\s(),;]*)\s*}/g
  var regexBlockKey = /([\w\s%,])*{/

  result = result.trim().replace(/\s+/g, ' ')
  // var animationName = result.match(regexMainBlock)[1]
  var mainBlock = result.match(regexMainBlock)[2].trim()
  var blocks = mainBlock.match(regexBlocks)
  for (var block of blocks) {
    var keys = block.match(regexBlockKey)[0].trim().split(',')
    keys = keys.map(keyToOffset)
    var content = blockToContent(block)
    keyframes = keyframes.concat(mix(keys, content))
  }
  return keyframes
}

module.exports = Keyframe

function keyToOffset (key) {
  key = key.trim()
  if (key.indexOf('from') > -1) return 0
  if (key.indexOf('to') > -1) return 1
  return parseInt(key) / 100
}
function blockToContent (block) {
  block = block.substring(block.indexOf('{') + 1, block.indexOf('}')).trim()
  var rules = block.split(';')
  var data = Object.create(null)
  for (var rule of rules) {
    rule = rule.split(':')
    var key = rule[0].trim()
    if (key) {
      var value = rule[1].trim()
      if (key === 'animation-timing-function') data.easing = value
      else data[key] = value
    }
  }
  return data
}
function mix (keys, data) {
  var frames = []
  for (var i = 0; i < keys.length; i++) {
    frames[i] = xtend(data, { offset: keys[i] })
  }
  return frames
}
