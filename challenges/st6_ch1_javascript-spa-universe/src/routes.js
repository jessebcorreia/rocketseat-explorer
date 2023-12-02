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

    this.checkPage()
  }

  checkPage(){

    const linkHome = document.querySelector('#link-home')
    const linkUniverse = document.querySelector('#link-universe')
    const linkExploration = document.querySelector('#link-exploration')
    const bodyHtml = document.querySelector('body')
  
    const {pathname} = window.location
  
    linkHome.classList.remove('active')
    linkUniverse.classList.remove('active')
    linkExploration.classList.remove('active')
  
    switch(pathname) {
      case "/":
        linkHome.classList.add('active')
        bodyHtml.style.backgroundImage = "url('/assets/mountains-universe-1.png')"
        break
  
      case "/universe":
        linkUniverse.classList.add('active')
        bodyHtml.style.backgroundImage = "url('/assets/mountains-universe-2.png')"
        break
  
      case "/exploration":
        linkExploration.classList.add('active')
        bodyHtml.style.backgroundImage = "url('/assets/mountains-universe-3.png')"
        break
  
      default:
        break
    }
  
  }

}