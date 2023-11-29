import State from './state.js'
import * as Events from './events.js'
import * as Timer from './timer.js'

export function start(minutes, seconds) {
  State.minutes = minutes
  State.seconds = seconds

  Timer.updateDisplay(minutes, seconds)
  Events.registerControls()
  Events.setMinutes()
}