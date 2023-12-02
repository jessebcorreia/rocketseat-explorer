export class Router {
  routes = {}
  // adicionar via função propriedade:valor

  add(routeName, page){
    this.routes[routeName] = page
  }

  route(event){
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)
    this.handle()
  }

  handle(){

    const { pathname } = window.location

    const route = this.routes[pathname] || this.routes[404]

    fetch(route)
      .then( resultData => resultData.text())
      .then( resultDataHTML => {
        document.querySelector("#app").innerHTML = resultDataHTML
      })
  }

}