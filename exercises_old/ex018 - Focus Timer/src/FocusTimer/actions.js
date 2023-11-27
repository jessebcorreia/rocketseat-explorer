import State from './state.js'
import * as Timer from './timer.js'
import * as Elements from './elements.js'
import * as Sounds from './sounds.js'

export function toggleRunning(){
  State.isRunning = document.documentElement.classList.toggle('running')
  Timer.countdown()
  Sounds.buttonPressAudio.play()
}

export function set(){
  Elements.minutes.setAttribute('contenteditable', true)
  Elements.minutes.focus()
}

export function reset(){
  State.isRunning = false
  document.documentElement.classList.remove('running') 
  Timer.updateDisplay()
  Sounds.buttonPressAudio.play()
}

export function toggleMusic(){
  State.isMute = document.documentElement.classList.toggle('music-on')
  State.isMute ? Sounds.bgAudio.play() : Sounds.bgAudio.pause()
}