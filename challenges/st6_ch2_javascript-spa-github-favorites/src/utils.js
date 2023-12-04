import { FavoritesView } from './favorites.js'

//função simples para testar o funcionamento da aplicação
export function test(option){

  switch(option){
    
    case "add":
      const favoritesView = new FavoritesView("#app")

      const usernames = ['torvalds', 'Bullas', 'gabrielfroes', 'lucasmontano', 'deyvin', 'matheusbattisti', 'gustavoguanabara', 'cursoemvideo', 'filipedeschamps', 'akitaonrails', 'maykbrito', 'jessebcorreia']

      usernames.forEach( user => {
        favoritesView.add(user)
      })

      break

    case "delete":
      localStorage.clear()
      favoritesView.add('')
      break

    default:
      console.log("nenhuma opção foi selecionada")
      break
  }
}