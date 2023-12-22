import { Container, Links, Content } from './styles'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tags'
import { ButtonText } from '../../components/ButtonText'

export function Details(){
  return(
    <Container>
      <Header/>
      <main>
        <Content>

          <ButtonText title='Excluir nota'></ButtonText>

          <h1>Introdução ao React</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam voluptate, animi, sapiente aut iusto corporis pariatur soluta accusantium provident atque dolores ex quod perferendis ipsam voluptatibus, enim accusamus eius molestias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ex eum impedit, ratione iusto vel quod nobis dolores exercitationem, voluptates facilis officiis? Fuga eveniet distinctio numquam quam, assumenda unde animi!</p>

          <Section title="Links Úteis" >
            <Links>
              <li><a href="#">Item 1</a></li>
              <li><a href="#">Item 2</a></li>
              <li><a href="#">Item 3</a></li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="nodejs" />
            <Tag title="nodejs" />
          </Section>

          <Button title="Voltar" />

        </Content>
      </main>
    </Container>
  )
}