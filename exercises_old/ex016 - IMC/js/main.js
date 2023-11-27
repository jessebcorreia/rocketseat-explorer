//modulação de código
import { Modal } from './modal.js'
import { AlertError } from './alert-error.js'
import { calculateIMC , notNumber } from './utils.js'

const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')

form.onsubmit = event => {
  event.preventDefault()

  const weight = inputWeight.value
  const height = inputHeight.value

  const weightOrHeightIsNotANumber = notNumber(weight) || notNumber(height)

  if(weightOrHeightIsNotANumber){
    AlertError.open()
    return
  }

  AlertError.close()

  const result = calculateIMC(weight, height)
  displayResultMessage(result)
}

function displayResultMessage(result){
  const message = `Seu IMC é de ${result}`
  Modal.message.innerText = message
  Modal.open()
}

form.addEventListener('input', closeAlertError)

function closeAlertError() {
  AlertError.close()
}