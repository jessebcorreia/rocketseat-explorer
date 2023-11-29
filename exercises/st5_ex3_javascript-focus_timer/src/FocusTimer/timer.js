import State from './state.js'
import * as Elements from './elements.js'
import { reset } from './actions.js'
import * as Sounds from './sounds.js'

export function countdown(){

  clearTimeout(State.countdownId)

  if(!State.isRunning) {return}

  let minutes = Number(Elements.minutes.textContent)
  let seconds = Number(Elements.seconds.textContent)

  seconds--
  if(seconds < 0){
    seconds=59
    minutes--
  }

  if(minutes < 0) {
    reset()
    Sounds.kichenTimer.play()
    return
  }

  updateDisplay(minutes, seconds)
  
  State.countdownId = setTimeout(
    ()=>{
      countdown()
    }
    , 1000
  )
}

export function updateDisplay(minutes, seconds){
  /* nullish coalesing operador */
  minutes = minutes ?? State.minutes
  seconds = seconds ?? State.seconds

  Elements.minutes.textContent = String(minutes).padStart(2, "0")
  Elements.seconds.textContent = String(seconds).padStart(2, "0")
}