class Keyboard
  pressedKeys: {}

  constructor: ->
    window.addEventListener "keydown", (event) =>
      @pressedKeys[event.keyCode] = true

    window.addEventListener "keyup", (event) =>
      delete @pressedKeys[event.keyCode]

  isKeyPressed: (charOrKeyCode) ->
    if typeof(charOrKeyCode) is "number"
      @pressedKeys[charOrKeyCode]?
    else
      @pressedKeys[charOrKeyCode.charCodeAt(0)]?

module.exports = new Keyboard()