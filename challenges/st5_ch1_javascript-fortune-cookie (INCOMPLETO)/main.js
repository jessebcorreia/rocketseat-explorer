let section1 = document.querySelector('.section1')
let section2 = document.querySelector('.section2')
let img01 = document.querySelector('#img01')
let btnReset = document.querySelector('#btnReset')

img01.addEventListener('click', sectionToggle)
btnReset.addEventListener('click', sectionToggle)

//Funções CallBack
function openCookie(){
  
}

function sectionToggle(){
  section1.classList.toggle('hide')
  section2.classList.toggle('hide')
}