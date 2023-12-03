// classe responsável pela comunicação entre a minha aplicação e a API do github
export class GitHubUser {

  // método estático (static)
  static search(username){
    //local de onde os dados serão retornados
    const endpoint = `https://api.github.com/users/${username}`

    // fetch irá buscar a informação na API, sem travar toda a aplicação
    return fetch(endpoint)
      //  converte em JSON os dados retornados pela API
      .then(data => data.json())

      .then(
        // para retornar um objeto, precisei colocar o par de chaves em um group operator ()
        // eu estou desestruturando o login, name, public_repos, followers de dentro do return data.json(), depois utilizo isso como parâmetro para uma arrow function. Esses parâmetros são utilizados para retornar um objeto (SHORTHAND).
        ({ login, name, public_repos, followers }) => ({
          login,
          name,
          public_repos,
          followers,
        })

        /* --x-- OUTRA FORMA DE ESCREVER O MESMO CÓDIGO ACIMA --x--

          (data) => {
            return {
              login: data.login,
              name: data.name, 
              public_repos: data.public_repos,
              followers: data.followers
            }
          }

        */

      )

  }

}