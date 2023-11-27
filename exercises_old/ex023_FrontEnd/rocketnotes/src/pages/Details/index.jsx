import { Container, Links, Content } from "./styles.js"

import { Tag }        from "../../components/Tag"
import { Button }     from "../../components/Button"
import { Header }     from "../../components/Header"
import { Section }    from "../../components/Section"
import { ButtonText } from "../../components/ButtonText"

export function Details(){

  return(
    <Container>

      <Header />

      <main>
        <Content>
          <ButtonText title="Excluir a nota"/>

          <h1>
            Introdução ao React
          </h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi labore error sapiente iusto accusantium! Sint veritatis, officiis quia necessitatibus harum, impedit ipsum perspiciatis accusamus dicta obcaecati velit provident fugiat. Asperiores.
          </p>

          <Section title="Links úteis">
            <Links>
              <li>
                <a href="#">https://www.rocketseat.com.br/</a>
              </li>
              <li>
                <a href="#">https://www.rocketseat.com.br/</a>
              </li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="express"/>
            <Tag title="node"/>
          </Section>

          <Button title="Voltar"/>
        </Content>
      </main>
 
    </Container>
  )
}