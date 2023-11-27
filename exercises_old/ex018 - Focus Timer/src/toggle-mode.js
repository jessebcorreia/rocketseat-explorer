const btnToggleMode = document.querySelector('#toggle-mode')
let darkMode = true

btnToggleMode.addEventListener('click', (event) => {
  const mode = darkMode ? 'light' : 'dark'
  document.documentElement.classList.toggle('light')

  event.currentTarget
    .querySelector('span').textContent = `${mode} mode ativado`
  darkMode = !darkMode
})