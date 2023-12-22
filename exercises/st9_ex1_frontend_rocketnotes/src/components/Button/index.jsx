import { Container } from './styles'

export function Button({loading = false, title, ...rest}){
//desestruturação de props    |||||   loading, por padrão, é falso
  return(
    <Container
      type="button"
      disabled={loading}
      {...rest} //recebe outras propriedades não explícitas
    >
      {loading? 'Carregando...' : title}
    </Container>
  )
}

