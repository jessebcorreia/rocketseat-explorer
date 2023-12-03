export class Router {

  routes = {}

  add(name, path){
    this.routes[name] = path
  }

  route(event){
    event = event || window.event
    event.preventDefault()
    window.history.pushState({}, "", event.target.href)
    this.handle()
  }

  handle(){
    const {pathname} = window.location
    const route = this.routes[pathname] || this.routes[404]
    const app = document.querySelector("#app")
    
    fetch(route)
      .then( data => data.text() )
      .then( html => app.innerHTML = html)
  }

  checkpage(){}

}