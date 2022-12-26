import { Ball } from './ball.js'
import { Paddle } from './paddle.js'

const ball =  new Ball(document.getElementById('ball'))
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const computerPaddle = new Paddle(document.getElementById('computer-paddle'))
const playerScoreElement = document.getElementById('player-score')
const computerScoreElement = document.getElementById('computer-score')

let lastTime 

function gameLoop(time) {
  if (lastTime != null ) {
    const delta = time - lastTime 
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, ball.y) 

    if(isLose()) handleLoose()
  }

  lastTime = time
  window.requestAnimationFrame(gameLoop)
} 

function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
    
}

function handleLoose() {
  const rect = ball.rect()

  ball.reset()
  computerPaddle.reset()

  if(rect.right >= window.innerWidth){
    playerScoreElement.textContent = parseInt(playerScoreElement.textContent) + 1
    return
  }

  computerScoreElement.textContent = parseInt(computerScoreElement.textContent) + 1
 

}

document.addEventListener('mousemove', (e) => {
  playerPaddle.position = e.y / window.innerHeight * 100
})

window.requestAnimationFrame(gameLoop)
