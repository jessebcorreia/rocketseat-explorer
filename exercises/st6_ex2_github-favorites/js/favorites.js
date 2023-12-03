import { GitHubUser } from "./github-user.js"

class Favorites {

  constructor(root){
    // o objetivo da função "constructor" é já atribuir atributos e métodos predefinidos para a classe, sempre ela for instanciada
    
    // define atributo (variável) para o root (tag #app)
    this.root = document.querySelector(root)

    // define atributo (variável) para o corpo da tabela, que receberá os dados
    this.tbody = this.root.querySelector('table tbody')

    // sempre executa o método load, ao ser instanciada
    this.load()
  }

  async add(username){

    // retorna um valor booleano, para verificar se o usuário já está cadastrado na aplicação
    const userExists = this.entries.find(entry => entry.login === username)

    // TRY: tenta executar um bloco de código. CATCH: redireciona o fluxo em caso de erro.
    try {
      
      // se o valor booleano for verdadeiro (ou seja, se o usuário já estiver cadastrado), retorna erro. Esse erro pode ser visto no console do navegador.
      if(userExists) {
        throw new Error('Usuário já cadastrado')
      }

      // executa um método da classe GitHubUser. É utilizado o AWAIT, porque o método add() possui o ASYNC. O username também é definido pelo método add().
      // a execução desse método retorna um objeto, que fica "armazenado" dentro da constante user, criada abaixo. Sendo assim, ela possui agora propriedades acessíveis mais adiante.
      // MÉTODO STATIC - Não precisa instanciar 'new GitHubUser', pode chamar direto
      const user = await GitHubUser.search(username)

      // a propriedade login pertence ao objeto user, definido acima. A função abaixo está verificando se a propriedade é indefinida, porque sendo esse o caso, o usuário não existe no banco de dados do github.
      if(user.login === undefined){
        throw new Error('Usuário não encontrado!')
      }

      // princípio de imutabilidade - eu não estou adicionando valor em um array já existente, mas sim criando um novo array com o user, somado com os dados da array antiga.
      this.entries = [user, ...this.entries]

      //executa o método update() definido em FavoritesView? 
      this.update()

      //executa o método save(), definido aqui em Favorites
      this.save()

    } catch(error){
      alert(error.message)
    }
  }

  load(){
  // localStorage é uma API do Browser e possui várias funcionalidades/métodos (clear, getItem, etc). Aqui, usarei o .getItem() e darei um nome personalizado para minha chave.
  // O valor armazenado é em formato de string. Por esse motivo, eu preciso convertê-la em um objeto, para que eu possa acessar as suas propriedades.
  // JSON.parse transforma string em objeto javascript | JSON.stringify faz o oposto.
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save(){
    // olhar os comentários da função load()
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  delete(user){
    // o método .filter é uma Higher-order functions (map, filter, find, reduce, etc)
    // respeita o princípio da imutabilidade - ao rodar o filtro, retorna um novo array
    // retorno false = remove entrada | retorno true = adiciona entrada | o resultado é uma nova array criada do zero
    const filteredEntries = this.entries.filter((entry) => {
      // compara a propriedade login do usuário informado no parâmetro da função delete(), com a propriedade login da estrutura de repetição filter (loop pelo this.entries).
      // Se o valor de ambas as propriedades forem iguais, o retorno booleano será FALSO, logo excluirá a entrada do novo array sendo gerado.
      return entry.login !== user.login
    })

    // aqui eu sobreponho a array antiga pela nova (não acrescento ou removo valores, eu substitituo a array inteira antiga pela nova, para respeitar a imutabilidade).
    this.entries = filteredEntries

    // chamo os métodos update() e save()
    this.update()
    this.save()
  }

}

// a classe FavoritesView herda os atributos e métodos da classe Favorites. Para isso é utilizado o "extends", e também o "super()" no constructor.
export class FavoritesView extends Favorites {

  constructor(root) {
    super(root)
    // executa o método update() ao ser instanciada
    this.update()
    // executa o método onAdd() ao ser instanciada
    this.onAdd()
  }

  onAdd(){
    // define em uma constante o botão HTML para adicionar um novo usuário na aplicação
    const addButton = this.root.querySelector('.search button')

    // atribui uma função anônima no evento "click" do botão. 
    addButton.onclick = () => {
      
      //desestrutura o valor, dentro do input de pesquisa (local onde digita-se o nome de usuário)
      const { value } = this.root.querySelector('.search input')

      // executa a função assíncrona add(username), passando como parâmetro o valor do input. Essa função é herdada da class Favorites, com o constructor super(root).
      this.add(value)
    }
  }

  update(){
    // chama a função para remover todas as linhas 
    this.removeAllRows()

    this.entries.forEach( user => {
      const row = this.createRow(user.name, user.login, user.public_repos, user.followers)      
      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha?')
        if(isOk){
          this.delete(user)
        }
      }
      this.tbody.append(row)
    })
  }

  removeAllRows(){
    // variável/atributo definido no constructor. Estrutura de repetição que remove cada linha dentro do corpo da tabela.
    this.tbody.querySelectorAll('tr')
      .forEach( (tr) => {
        tr.remove()
      })
  }

  createRow(userName, userLogin, publicRepos, followers){
    // define um template em HTML para incluir novas linhas dentro da tabela. A constante "content" está recebendo a string em html, juntamente com as variáveis da função.
    const content = `
      <td class="user">
        <img src="https://github.com/${userLogin}.png" alt="imagem de ${userName}">
        <a href="https://github.com/${userLogin}" target="_blank">
          <p>${userName}</p>
          <span>${userLogin}</span>
        </a>
      </td>
      <td class="repositories">
        ${publicRepos}
      </td>
      <td class="followers">
        ${followers}
      </td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `

    // cria o elemento em HTML, para poder ser incluído na página
    const tr = document.createElement('tr')

    // inclui dentro do elemento o conteúdo HTML definido na constante
    tr.innerHTML = content

    // a execução dessa função irá retornar o elemento HTML pronto para ser usado!
    return tr
  }

}