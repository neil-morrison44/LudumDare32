keyboard = require "../control/keyboard"

HEIGHT = 280
WIDTH = 220

gasMainImage = new Image()
gasMainImage.src = "images/gas_main.png"

gasFistImage = new Image()
gasFistImage.src = "images/gas_fist.png"

class Gas
  rightPunch: 0

  leftPunch: 0

  punchRight: true

  punch: false

  constructor: ->
    @position =
      x: 0
      y: 0

  render: (context, xOffset, yOffset) ->
    context.save()
    context.fillStyle = "green"
    # context.globalAlpha = 0.5
    yValue = (@position.y + yOffset) - HEIGHT
    xValue = @position.x + xOffset
    # context.fillRect xValue, yValue, WIDTH, HEIGHT
    context.drawImage gasMainImage, xValue, yValue

    punchX = (xValue + 180) + @leftPunch
    punchY = (yValue + 140) - (@leftPunch * 1.2)
    context.drawImage gasFistImage, punchX, punchY
    punchX = (xValue + 150) + @rightPunch
    punchY = (yValue + 150) - (@rightPunch * 1.2)
    context.drawImage gasFistImage, punchX, punchY
    context.restore()

  update: ->

    @position.y += Math.sin(Date.now()/100)
    @position.x += Math.cos(Date.now()/200)

    if keyboard.isKeyPressed "W"
      if @position.y - 2 >= 0
        @position.y -= 2
    else if keyboard.isKeyPressed "S"
      if @position.y <= 433
        @position.y += 2

    if keyboard.isKeyPressed "D"
      @position.x += 2
    else if keyboard.isKeyPressed "A"
      @position.x -= 2

    if keyboard.isKeyPressed " "
      if @punchRight
        if @rightPunch < 20
          @rightPunch += 4
      else if @leftPunch < 20
        @leftPunch += 4.5

      if @leftPunch >= 20 or @rightPunch >= 20
        @punch = true
    else
      if @rightPunch > 0
        @rightPunch--
        if @rightPunch <= 10
          @punchRight = false

      if @leftPunch > 0
        @leftPunch--
        if @leftPunch <= 10
          @punchRight = true

module.exports = Gas