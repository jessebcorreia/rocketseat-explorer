import { Router } from "./router.js"

const router = new Router()
// estou criando um objeto, tomando como base a classe Router

// abaixo, vou executar a função definida dentro da classe e instanciada no objeto
// vou adicionar dentro do objeto routes o nome da propriedade, e o valor
router.add('/'       , '/pages/home.html')
router.add('/about'  , '/pages/about.html')
router.add('/contact', '/pages/contact.html')
router.add(404       , '/pages/404.html')

// como o objeto foi instanciado de uma classe...
// vou precisar chamar o método/função que está dentro da classe .
router.handle()

window.addEventListener('popstate', router.handle)
//window.onpopstate = () => router.handle()

// eventos de click da navegação estão sendo atribuidos direto no index.html

window.route = () => router.route()
// atribuo na window a função route
