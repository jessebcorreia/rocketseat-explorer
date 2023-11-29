//Variáveis da aplicação

let randomNumber = Math.round(Math.random() * 10)
const inputNumber = document.querySelector('#inputNumber')

const screen1 = document.querySelector('.screen1')
const screen2 = document.querySelector('.screen2')

const btnTry = document.querySelector('#btnTry')
const btnReset = document.querySelector('#btnReset')
const resultTitle = document.querySelector('#resultTitle')
const xAttemptsText = document.querySelector('.screen1 p')

let xAttempts = 1

//Eventos

btnTry.addEventListener('click', handleTryClick)
btnReset.addEventListener('click', handleResetClick)
document.addEventListener('keydown', function(e) {
  if(e.key == 'Enter' && screen1.classList.contains('hide')) {
      handleResetClick()
  }
})

//Funções CallBack

console.log(`Número sorteado: ${randomNumber} (conferência)`)

function handleTryClick(e){
  e.preventDefault()

  console.log(`input: ${inputNumber.value}`)

  if(Number(inputNumber.value) == Number(randomNumber)) {
    console.log('Acertou')
    toggleScreen()
    resultTitle.textContent = `Acertou na ${xAttempts}ª tentativa`
  }

  xAttemptsText.style.color = "red"
  xAttemptsText.textContent = `(${xAttempts}) tentativa${xAttempts>1?'s':''} até o momento`
  xAttempts++
  inputNumber.value = ""
}

function handleResetClick(e){
  toggleScreen()

  xAttempts = 1
  xAttemptsText.style.color = "#34355B"
  xAttemptsText.textContent = `Clique acima para iniciar o jogo`
  randomNumber = Math.round(Math.random() * 10)
  console.log(`Número sorteado: ${randomNumber} (conferência)`)
}

function toggleScreen(){
  screen1.classList.toggle('hide')
  screen2.classList.toggle('hide')
}