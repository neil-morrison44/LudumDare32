Gas = require "../characters/gas"
Health = require "../ui/health"
Man = require "../characters/man"
FireMan = require "../characters/fireman"

GROUND_HEIGHT = 567

groundImage = new Image()
groundImage.src = "images/ground.png"

deepBackgroundImage = new Image()
deepBackgroundImage.src = "images/deep_background.png"


skyText = [
  "So... this is a pretty bad game",
  "I was sort of going for a dark satirical thing",
  "but I couldn't put my heart into it.",
  "Realised that there's not much",
  "that can really stop a gas attack",
  "so it's just a massacre",
  "I hope you feel good about that.",
  "These people could have families..",
  "Oddly identical families...",
  "(poor asset jibe, not any sort of racism)",
  "this game isn't racist. It's meaningful.",
  "Unless you're really enjoying it",
  "but that's pretty unlikely.",
  "It's not fun on purpose! Yes! See.",
  "...",
  "...",
  "Not been feeling LudumDare for the last few",
  "think this might be my last one for a while",
  "There's no end to the game by the way..."
]

class GameScene
  xPos: 0
  skyTextPos: -1
  startTime: 0
  textBeats: 0

  killedOne: false

  startUp: ->
    @xPos = 0

    @player = new Gas()
    @health = new Health()

    @enemies = []

    @startTime = Date.now()

    @fireManRate = 0.99
    
  render: (context) ->
    @drawBackground context
    @drawGround context

    @drawCharacters context
    @drawForeGround context

    @health.render context

    @enemies.sort (a, b) ->
      a.position.y - b.position.y

    if (enemy for enemy in @enemies when enemy.health isnt 0).length  < 4
      if Math.random() > @fireManRate
        @enemies.push new FireMan()
      else
        @enemies.push new Man()

  drawBackground: (context) ->
    context.save()
    # sky
    context.fillStyle = "rgb(123, 167, 250)"
    context.fillRect 0, 0, 1000, 1000

    # distant city

    context.fillStyle = "grey"
    # context.fillRect 0, (GROUND_HEIGHT - 200), 1000, 200
    context.drawImage deepBackgroundImage, 0, (GROUND_HEIGHT - 200)
    context.drawImage deepBackgroundImage, 749, (GROUND_HEIGHT - 200)

    if (Date.now() > @startTime + 5000) and @killedOne

      if @textBeats is 0 && skyText.length > @skyTextPos + 1
        @skyTextPos++
        @textBeats = skyText[@skyTextPos].length * 10
        if skyText[@skyTextPos] is "..."
          @textBeats = 300
      @textBeats--

      context.save()
      context.textAlign = "center"
      context.fillStyle = "white"
      context.font = "50px Helvetica"
      context.fillText skyText[@skyTextPos], 500, 300
      context.restore()

    context.restore()

  drawGround: (context) ->
    context.save()
    context.fillStyle = "#8F7107"
    context.fillRect 0, GROUND_HEIGHT, 1000, (1000 - GROUND_HEIGHT)
    context.drawImage groundImage, 0, GROUND_HEIGHT
    context.drawImage groundImage, 450, GROUND_HEIGHT
    context.drawImage groundImage, 900, GROUND_HEIGHT
    context.restore()

  drawCharacters: (context) ->
    for enemy in @enemies
      enemy.update @player
      enemy.render context, @xPos, GROUND_HEIGHT

      if @player.punch && enemy.health > 0
        if Math.round(enemy.position.y / 10) is Math.round(@player.position.y / 10)
          if Math.round((enemy.position.x - 200) / 100) is Math.round(@player.position.x / 100)
            if enemy.health > 0
              if @fireManRate > 0.2
                @fireManRate -= 0.05
              enemy.health--
              if enemy.health is 0
                @killedOne = true
            @player.punch = false

    @player.update()
    @player.render context, @xPos, GROUND_HEIGHT

  drawForeGround: (context) ->
    context.save()
    context.fillStyle = "pink"
    # context.fillRect 150, GROUND_HEIGHT + 1, 10, (1000 - (GROUND_HEIGHT + 1))
    context.restore()


module.exports = GameScene