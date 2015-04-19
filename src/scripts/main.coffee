GameScene = require "./scenes/game_scene"

gameCanvas = document.querySelector("#gameCanvas")
gameContext = gameCanvas.getContext("2d")

gameScene = new GameScene()

render = ->
  gameScene.render gameContext
  window.requestAnimationFrame render

gameScene.startUp()
render()