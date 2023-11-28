let operatorText = (
`Digite o tipo de operação que deseja fazer:

1. Adição
2. Subtração
3. Multiplicação
4. Divisão
5. Resto da Divisão`
)

let operator
let operatorReference
let again
let number1
let number2
let result

function calculate(expression,n1,n2){
  switch(expression){
    case 1:
      operatorReference = "+"
      return n1 + n2
      break
    case 2:
      operatorReference = "-"
      return n1 - n2
      break
    case 3:
      operatorReference = "*"
      return n1 * n2
      break
    case 4:
      operatorReference = "/"
      return n1 / n2
      break
    case 5:
      operatorReference = "%"
      return n1 % n2
      break
    default:
      break
  }
}

function question(){
  result = undefined
  again = undefined
  while(result == undefined || result == null || isNaN(result) == true){
    operator = Number(prompt(operatorText))
    number1 = Number(prompt('Digite o primeiro número'))
    number2 = Number(prompt('Digite o segundo número'))
    result = calculate(operator, number1, number2)
    if(result == undefined || result == null || isNaN(result) == true) {
      alert('Não foi possível realizar este cálculo. Verifique se os parâmetros foram preenchidos corretamente.')
    }
  }
}

function questionAgain(){
  while(again == undefined || again == null || isNaN(again) == true || again < 1 || again > 2){

    again = Number(prompt(

`
> Resultado:   ${number1 + ' ' + operatorReference + ' ' + number2 + ' = ' + result}
> ${result} é um número ${result % 2 == 0 ? 'par' : 'impar'}
> Os números utilizados para o cálculo ${number1 == number2 ? 'são iguais entre si' : 'não são iguais entre si'}

Deseja fazer uma nova operação:

1. Sim
2. Não
`

    ))
    if(again==1){
      question()
    } else if (again==2){
      alert('O sistema será encerrado')
    }
  }
}

question()
questionAgain()