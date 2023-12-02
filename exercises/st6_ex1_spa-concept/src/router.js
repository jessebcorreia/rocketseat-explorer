export class Router {

  routes = {}
  // estou criando um objeto vazio, que receberá os valores pela função

  add(routeName, pageLink) {
    this.routes[routeName] = pageLink
    // o objeto routes está sendo criado dentro da classe
    // na mesma classe, há esta função que adiciona novas propriedades ao objeto
    // resumindo: o objeto routes [propriedade] recebe o valor = valor
  }

  route(event) {
    event = event || window.event
    event.preventDefault()
  
    window.history.pushState({}, "", event.target.href)
    //quem disparou o evento (target) foi uma tag 'a', que possuir href
    //com essa função, estou pegando o href e colocando no histórico
  
    this.handle()
    //this.handle()
    // é necessário utilizar o "this."
    // será a referência à instância/objeto que será criado
  }

  handle() {
    const { pathname } = window.location
      //const pathname = window.location.pathname
      //const href     = window.location.href
    const route = this.routes[pathname] || this.routes[404]
      //pathname está retornando uma string "/nomeDaRota"
      //a string está servindo de parâmetro para acessar a propriedade
      //se a rota não estiver mapeada, mostrar a rota 404
  
    fetch(route)
      .then(
        data => data.text()
        // function (data) { return data.text()
        // retorna o valor para o próximo .then }
      )
      .then(
        // html é o nome do parâmetro que está recebendo o retorno acima
        //function (html) { return document.querySelector('#app').innerHTML = html }
        html => { document.querySelector('#app').innerHTML = html }
      )
  }

}


