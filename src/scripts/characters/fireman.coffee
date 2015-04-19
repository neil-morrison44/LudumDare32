Man = require "./man"

fireManImage = new Image()
fireManImage.src = "images/fireman.png"

fireManHurtImage = new Image()
fireManHurtImage.src = "images/fireman_smash.png"

deadFireManImage = new Image()
deadFireManImage.src = "images/fireman_dead.png"

puffImage = new Image()
puffImage.src = "images/puff.png"

class FireMan extends Man
  health: 2
  image: fireManImage
  deadImage: deadFireManImage

  puffing: false

  puffState: 0

  render: (context, xOffset, yOffset) ->
    pos = @getPosition xOffset, yOffset

    if @health is 1
      @image = fireManHurtImage

    if @puffState > 0
      context.save()
      context.globalAlpha = @puffState
      context.drawImage puffImage, pos.x - 55, pos.y + 40
      context.restore()

    if Math.random() > 0.95 && @health > 0
      @puffing = true
      @puffState = 1
    else
      @puffing = false
      @puffState = Math.max 0, @puffState - 0.05

    super

  update: ->
    super

module.exports = FireMan