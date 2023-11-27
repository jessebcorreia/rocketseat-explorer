let students = [
  student1 = {
    name: 'João da Silva',
    grade1: 9,
    grade2: 4.5,
  },
  student2 = {
    name: 'Maria da Silva',
    grade1: 4,
    grade2: 6,
  },
  student3 = {
    name: 'Antônio Conceição',
    grade1: 6.5,
    grade2: 8,
  },
  student4 = {
    name: 'João da Silva',
    grade1: 5.5,
    grade2: 9.5,
  },
]

function check(){
  let studentName
  let gradeAvarage
  let approved
  let resultText

  for(let i in students) {
    studentName = students[i].name
    gradeAvarage = ( students[i].grade1 + students[i].grade2 ) / 2
    approved = gradeAvarage >= 7 ? true : false
    resultText =

`A média do(a) aluno(a) ${studentName} é: ${gradeAvarage.toFixed(2)}
${approved == true ? `Parabéns ${studentName}! Você foi aprovado(a) no concurso!` : `Não foi dessa vez ${studentName}! Tente novamente!`}
`
    alert(resultText)
  }
}

check() //executa a função