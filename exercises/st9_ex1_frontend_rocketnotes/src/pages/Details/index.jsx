import { Container } from './styles'
import { Button } from '../../components/Button'

export function Details(){
  return(
    <Container>
      <h1>Hello World!</h1>
      <Button
        title="Título Personalizado"
        loading //boolean
      />
    </Container>
  )
}