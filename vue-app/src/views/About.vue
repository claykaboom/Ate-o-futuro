<template>
  <empty-layout>
    <vue-headful title="Sobre o Até o Futuro!" description="Até o Futuro" />
    <nav-bar :fixedTop="true" />

    <section class="hero  is-fullheight AteOFuturoBG">
      <!-- :style="`background-image: url('${require('@/assets/Background-Login.jpg')}');  background-size: cover;`"-->
      <div class="hero-body">
        <div class="container">
          <div class="slider-content animate__animated animate__fadeIn pb-6">
            <div>
              <h1 class="title is-1 main-text">Sobre o Até o Futuro</h1>
              <div class="box is-rounded">
                <div class="row columns is-centered">
                  <div class="column is-6">
                    <b-image :src="require('@/assets/Logo.gif')" ratio="6by3" />
                  </div>
                </div>
                <h2 class="subtitle is-4">Por que existimos?</h2>
                <b-message style="background-color: #e0a7fa">
                  <h3
                    class="subtitle is-4 has-text-centered"
                    style="color: #632391"
                  >
                    Para facilitar a colaboração criativa e criar uma nova
                    realidade. Juntos.
                  </h3>
                </b-message>
                <div class="row columns is-centered">
                  <div class="column is-9">
                    Teve uma época que eu comecei a me despedir das pessoas
                    dizendo
                    <b>"Até o Futuro"</b>. Era algo simples, mas que pegou. As
                    pessoas geralmente temem ao ouvir isso. Para elas essa
                    expressão soa como um "adeus", e para elas o "adeus" é
                    "muito tempo".
                    <br />
                    <br />
                    Essa expressão se incorporou em mim e eu repito inclusive
                    quando estou em outros contextos culturais ou idiomáticos. E
                    ela pega.
                    <br />
                    <br />
                    Assim como qualquer coisa que você repete, o seu jargão
                    também faz com que as pessoas te identifiquem ao ouvir
                    aquela expressão. Mas meu objetivo nunca foi criar somente
                    um jargão ou um <i>slogan</i>. A expressão simplesmente
                    declara a minha intenção de fazeri esforços conscientes para
                    me encontrar com aquela pessoa ou situação no futuro. Porque
                    somos nós que criamos a realidade (exceto quanto nos
                    deparamos com imprevistos sobre os quais não temos
                    controle). <br />

                    <br />
                    O <b>Até o Futuro</b> foi criado como uma forma de permitir
                    que pessoas pudessem se inspirar com histórias. Além disso,
                    eu pensei que se eu tivesse alguma forma de documentar e
                    padronizar as situações, decisões, interações com pessoas,
                    ou eventos pelos quais eu passei que me permitiram apreciar
                    o resultado final daquela ação, seria muito bom poder
                    compartilhar isso com outras pessoas.<br /><br />
                    Certamente não serão todas as pessoas que terão
                    oportunidades de estudar em um outro país, mas é possível
                    democratizar o aprendizado de um idioma. Nem todo mundo vai
                    se tornar um exímio programador, mas é possível democratizar
                    o pensamento computacional. No final, a crença do
                    <b>Até o Futuro</b> é que o pensamento de crescimento e de
                    expansão da consciência é um direito universal. E fazer isso
                    através de métodos de colaboração criativa permite que
                    <b> Nós criemos a realidade </b> <br /><br />
                    E no fim todos serão <b>hiperaprendizes</b>. Capazes de
                    transitar entre carreiras e de construir um portfolio que
                    mostra que elas estão lá para o que der e vier, e que vão se
                    adaptar e aprender o que quer que seja necessário para que
                    sejam bem sucedidas em qualquer contexto.
                  </div>
                  <div class="column is-3">
                    <b-image
                      ratio="9by18"
                      src="https://cdn.pixabay.com/photo/2018/07/09/21/16/soap-bubble-3527306_960_720.jpg"
                    />
                  </div>
                </div>
              </div>
              <b-message style="background-color: #e0a7fa">
                <h3
                  class="subtitle is-4 has-text-centered"
                  style="color: #632391"
                >
                  Você cria a realidade. A gente faz isso COM VOCÊ.
                </h3>
              </b-message>
              <div class="box is-rounded">
                <h2 class="subtitle is-4">Como criamos a realidade?</h2>
                <div class="row columns is-centered">
                  <div class="column is-12">
                    <b-image
                      src="https://cdn.pixabay.com/photo/2016/12/01/18/17/mobile-phone-1875813_960_720.jpg"
                      ratio="9by3"
                    />
                  </div>
                </div>
                <b-message type="is-success">
                  <h3 class="subtitle is-4 has-text-centered">
                    Usamos a tecnologia e experimentação ágil para criar
                  </h3>
                </b-message>
                <div class="row columns is-centered">
                  <div class="column is-5">
                    <b-image
                      src="https://cdn.pixabay.com/photo/2016/12/29/12/27/cyber-glasses-1938449_960_720.jpg"
                    />
                  </div>
                  <div class="column is-7">
                    Nosso modelo de trabalho é sempre pensando em como podemos
                    escalar uma ideia que temos? <br /><br />
                    Dessa forma, se pensamos que
                    <a
                      href="https://blog.claytonfreitas.com.br/cinco-vantagens-em-dar-feedback/"
                      target="blank"
                      >dar feedbacks</a
                    >
                    é algo que pode ajudar, vamos tentar prototipar, testar e
                    lançar isso como uma funcionalidade de nossa plataforma:

                    <router-link
                      class="button is-white is-inverted"
                      :to="{ name: 'SkillFeedback' }"
                    >
                     👥 Pedir feedback agora!</router-link
                    ><br />
                    Se a gente precisa conduzir nossas reuniões internas do Até
                    o Futuro de maneira colaborativa e criativa, temos uma caixa
                    de ferramentas:
                    <br />
                    <router-link
                      class="button is-success"
                      :to="{ name: 'Toolbox' }"
                    >
                     🛠 Abrir caixa de ferramentas</router-link
                    ><br />
                    Se precisamos comunicar algo para os nossos clientes ou para a nossa comunidade do Até o Futuro, vamos testar nossa habilidade de comunicar:
                    <br />
                    <a
                      class="button is-danger is-inverted" target-blank
                       href="https://www.youtube.com/channel/UCxoOTfxVPLdf2-vGKcmjlJw/playlists"
                    >
                     ▶ Veja nossa playlist no YouTube</a
                    ><br />
                   Além dessas coisas temos, em experimentação/validação:<br />
                   <ul>
                     <li>◾ Chatbot com Machine Learning para WhatsApp</li>
                     <li>◾ Simulador de Entrevistas</li>
                     <li>◾ Programa de Mentoria</li>
                     <li>◾ Workshop de Design Thinking</li>
                     <li>◾ Meetup de aprendizado de idiomas (Inglês, Espanhol, Sueco, e Português), através do Duolingo Events</li>
                     <li>◾ Ferramenta de Testes de Conhecimento</li>
                     <li>◾ Criador de OKRs (Objectives & Key Results)</li>
                     <li>◾ Árvore da Realidade Futura</li>
                     <li>◾ Gerenciador de Iniciativas</li>
                   </ul>
                   Fale com a gente se quiser contribuir!
                  </div>
                    <b-icon icon="linkedin" type="is-info"> </b-icon>
              <a target="blank"
                href="https://www.linkedin.com/shareArticle?mini=true&url=http://AteOFuturo.com.br&title=Dê%20um%20feedback%20e%20receba%205%20vantagens%20imediatas&summary=Olá!%20Que%20tal%20praticar%20a%20generosidade%20e%20dar%20um%20feedback%20para%20eu%20aprimorar%20minhas%20habilidades?!%20Até%20o%20Futuro!&source=AtéOFuturo"
                >AJUDE-NOS A CONTINUAR AJUDANDO OUTROS POR COMPARTILHAR SOBRE
                NÓS NO LINKEDIN</a
              ><br />
              
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <div class="box cta">
      <p class="has-text-centered">
        <span class="tag is-primary">NOVO</span>
        <router-link :to="{ name: 'AgendarEntrevista' }">
          Teste sua empregabilidade e receba dicas práticas sobre sua
          performance no mercado de trabalho
        </router-link>
      </p>
    </div> -->

 
    <br />
    
  </empty-layout>
</template>
<style scoped >
</style>
<script>
import Contributors from "../components/Contributors";
import NavBar from "../components/NavBar";
export default {
  name: "About",
  components: { Contributors, NavBar },
};
</script>  
                    