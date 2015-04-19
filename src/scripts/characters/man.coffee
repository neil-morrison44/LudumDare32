WIDTH = 120
HEIGHT = 220

manImage = new Image()
manImage.src = "images/man.png"

deadManImage = new Image()
deadManImage.src = "images/man_dead.png"

class Man
  health: 1
  deadImage: deadManImage
  image: manImage

  constructor: ->
    @position =
      x: 1000
      y: Math.random() * 433
    @randomOffset = Math.random() * 10

  render: (context, xOffset, yOffset) ->
    pos = @getPosition xOffset, yOffset
    if @health isnt 0
      context.drawImage @image, pos.x, pos.y
    else
      context.drawImage @deadImage, pos.x, pos.y + 150

  getPosition: (xOffset, yOffset) ->
    x: @position.x + xOffset
    y: (@position.y + yOffset) - HEIGHT

  update: (player) ->
    if @health is 0
      return
    goToX = player.position.x + 200 + @randomOffset
    goToY = player.position.y + @randomOffset

    speed = 0.5 + (@randomOffset / 5)
    if goToX < @position.x
      @position.x -= speed
    if goToX > @position.x
      @position.x += speed

    if goToY < @position.y
      @position.y -= speed
    if goToY > @position.y
      @position.y += speed


    
module.exports = Man