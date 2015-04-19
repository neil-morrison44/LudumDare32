LENGTH = 200

class Health
  level: 100
  lives: 3

  render: (context) ->
    context.save()

    # @level -= 0.5
    # if @level < 0
    #   @level = 100
    context.font = "30px Helvetica"

    context.fillStyle = context.strokeStyle = "green"
    context.fillText "Health:", 10, 33
    context.lineWidth = 2
    
    if @level < 15
      context.fillStyle = "red"
    else if @level < 30
      context.fillStyle = "yellow"
    context.fillRect 120, 10, (LENGTH / 100) * @level, 25

    context.strokeStyle = "black"

    context.strokeRect 120, 10, LENGTH, 25

    context.restore()

module.exports = Health