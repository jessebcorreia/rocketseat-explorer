import { controls } from './elements.js'
import * as Actions from './actions.js'
import * as Elements from './elements.js'
import * as Timer from './timer.js'
import State from './state.js'

export function registerControls(){
  controls.addEventListener('click', (event) => {
    const action = event.target.dataset.action
    if(typeof Actions[action] != "function") {return}
    Actions[action]()
  })
}

export function setMinutes(){
  Elements.minutes.addEventListener('focus', ()=> {
    Elements.minutes.textContent = ""
  })

  Elements.minutes.onkeypress = (event) => /\d/.test(event.key)
  Elements.minutes.addEventListener('blur', (event) => {
    let time = event.currentTarget.textContent
    time = time > 60 ? 60 : time
    State.minutes = time
    State.seconds = 0

    Timer.updateDisplay()
    Elements.minutes.removeAttribute('contenteditable')
  })
}