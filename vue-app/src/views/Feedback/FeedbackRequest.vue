<template>
  <layout-default
    ><div class="box">
      <vue-headful
        title="Até o Futuro - Peça um Feedback"
        description="Peça Feedback sobre uma habilidade, uma ideia, ou um evento"
      />
      <h1 class="title is-3">
        Pedir Feedback
        <span v-if="ResumoHabilidade">sobre {{ ResumoHabilidade }}</span>
      </h1>

      <div class="columns">
        <div class="column is-2">
          <vue-svg-gauge
            v-bind:class="{
              'animate__animated animate__heartBeat animate__faster':
                feedbackRequestQuality >= 100,
            }"
            :start-angle="-110"
            :end-angle="110"
            :value="feedbackRequestQuality"
            :separator-step="0"
            :min="0"
            :max="100"
            :gauge-color="feedbackRequestQualityColor"
            :scale-interval="1"
          />
        </div>
        <div class="column is-10">
          <h3 class="title is-3">💪 FORÇA DO SEU PEDIDO</h3>

          <b
            style="color: #48c774"
            v-bind:class="{
              'animate__animated animate__heartBeat animate__faster':
                feedbackRequestQuality >= 100,
            }"
            >{{ LABEL_QualityDeixeBarraVerde }}
            <b
              style="color: #000"
              v-if="dicaParaMelhora != null && dicaParaMelhora != ''"
              >Dica:</b
            >
            {{ dicaParaMelhora }}</b
          >
        </div>
      </div>
      <div class="columns">
        <div class="column is-10">
          <section>
            <b-steps
              v-model="activeStep"
              :animated="isAnimated"
              :rounded="isRounded"
              :has-navigation="hasNavigation"
              :icon-prev="prevIcon"
              :icon-next="nextIcon"
              :label-position="labelPosition"
              :mobile-mode="mobileMode"
            >
              <template
                v-if="customNavigation"
                slot="navigation"
                slot-scope="{ previous, next }"
              >
                <section class="columns is-centered">
                  <b-button
                    outlined
                    type="is-danger"
                    icon-pack="fas"
                    icon-left="backward"
                    :disabled="previous.disabled"
                    @click.prevent="previous.action"
                  >
                    Anterior
                  </b-button>
                  <b-button
                    outlined
                    type="is-success"
                    icon-pack="fas"
                    icon-right="forward"
                    :disabled="isNextDisabled"
                    @click.prevent="next.action" 
                    v-if="activeStep != 4"
                  >
                    Próximo </b-button
                  ><button
                    v-if="activeStep == 4"
                    @click="gravarFinal"
                    class="button is-success"
                  >
                    Finalizar
                  </button>
                </section>
              </template>
              <b-step-item step="1" label="Preparação" :clickable="true">
                <h1 class="title has-text-centered">Preparação</h1>
                Vamos nos preparar para um feedback de qualidade.
                <br />
                <br />

                Você vai notar que poucos campos são obrigatórios, e você sempre
                voltar aqui e pedir feedbacks com mais nível de detalhe à medida
                que você recebe retornos dos outros.
                <br />
                <br />
                <b>
                  💪 Quanto mais informações essenciais você der no seu pedido
                  de feedback, mais força ele vai ter,</b
                >
                fazendo com que o feedback que você vai receber seja mais
                relevante e específico para sua situação!
                <br /><br />
                <b
                  >⚡ Pedidos com mais força serão priorizados por nossos
                  experts e mentores.</b
                ><br />
                <br />
                <b style="color: #48c774"
                  >🎯 SUA MISSÃO É tentar deixar a barrinha no topo o mais perto
                  do verde e cheia possível!</b
                >
                Mesmo assim, se você não tiver os detalhes agora, ficaremos
                felizes em tentar ajudar da melhor maneira possível 😁.
                <br />
                <br />
                <b
                  >❗ IMPORTANTE: Ao prosseguir pedindo o feedback, isso
                  significa que você deu seu consentimento sobre nossa política
                  de privacidade, e reconhece que ninguém da equipe Até o Futuro
                  pode utilizar seus dados pessoais para outros fins diferentes
                  de te dar um feedback. Utilizaremos somente as informações
                  providas por você para te dar um feedback.</b
                >
                <br />
                <br />
                <b-field
                  label="Vamos nessa?! Você quer um feedback sobre o quê?"
                >
                  <b-dropdown
                    :scrollable="isScrollable"
                    :max-height="maxHeight"
                    v-model="finalidadeAtual"
                    aria-role="list"
                  >
                    <button
                      class="button is-primary"
                      type="button"
                      slot="trigger"
                    >
                      <template>
                        <b-icon :icon="finalidadeAtual.icon"></b-icon>
                        <span>{{ finalidadeAtual.text }}</span>
                      </template>
                      <b-icon icon="menu-down"></b-icon>
                    </button>

                    <b-dropdown-item
                      v-for="(finalidade, index) in finalidadesFeedback"
                      :key="index"
                      :value="finalidade"
                      aria-role="listitem"
                    >
                      <div class="media">
                        <b-icon
                          class="media-left"
                          :icon="finalidade.icon"
                        ></b-icon>
                        <div class="media-content">
                          <h3>{{ finalidade.text }}</h3>
                        </div>
                      </div>
                    </b-dropdown-item>
                  </b-dropdown>
                </b-field>

                <b-field
                  label="Quer que encontremos um especialista automaticamente para te dar um feedback?"
                >
                  <b-message type="is-primary">
                    Marcar esta opção significa que seu nome e os dados que você
                    preencher aqui serão compartilhados com um de nossos
                    experts. Nenhum outro dado como seu e-mail será
                    compartilhado. Nossos experts também se comprometem a não
                    divulgar seus dados para outras pessoas.
                    <br />
                    <br />

                    Caso contrário você pode distribuir o link de pedido a
                    pessoas confiáveis.

                    <br />
                    <br />

                    Se você não marcar esta opção você mesmo precisará
                    compartilhar o pedido de feedback com seus amigos e colegas.
                  </b-message>
                </b-field>
                <b-icon
                  icon="arrow-right"
                  class="animate__animated animate__headShake animate__infinite"
                  size="is-medium"
                /><b-checkbox v-model="wantsExpert">
                  Sim, quero um(a) expert para me dar feedback!
                </b-checkbox>
              </b-step-item>
              <b-step-item
                step="2"
                :label="finalidadeAtual.text"
                :clickable="true"
              >
                <h1 class="title has-text-centered">
                  {{ LABEL_DetalhesFinalidadeFeedback }}
                </h1>

                <b-field :label="LABEL_DescrevaAlvoDoFeedback">
                  <b-input
                    :placeholder="LABEL_DescrevaAlvoDoFeedbackPlaceholder"
                    rounded
                    v-model="ResumoHabilidade"
                  ></b-input>
                </b-field>

                <b-field :label="LABEL_FinalidadeUsoFeedback">
                  <b-select
                    :placeholder="LABEL_FinalidadeUsoFeedbackPlaceholder"
                    v-model="FinalidadeHabilidade"
                    expanded
                  >
                    <option
                      v-for="opcao in OPTIONS_FinalidadeUsoFeedback"
                      v-bind:key="opcao.value"
                      :value="opcao.value"
                    >
                      {{ opcao.text }}
                    </option>
                  </b-select>
                </b-field>
                <b-field :label="LABEL_ComoDemonstra">
                  <b-input
                    v-model="DescricaoHabilidade"
                    type="textarea"
                    minlength="10"
                    maxlength="2048"
                    :loading="$store.state.isLoading"
                    :placeholder="LABEL_ComoDemonstraPlaceholder" 
                  >
                  </b-input>
                </b-field>
                <h2 class="subtitle is-4 has-text-centered">
                  👊🏻 Suas ações ⚡
                </h2>

                <b-field :label="LABEL_OQueVoceJafez">
                  <b-input
                    v-model="OQueJaFez"
                    type="textarea"
                    minlength="10"
                    maxlength="2048"
                    :loading="$store.state.isLoading"
                    :placeholder="LABEL_OQueVoceJafezPlaceholder" 
                  >
                  </b-input>
                </b-field>
                <h2 class="subtitle is-4 has-text-centered">
                  🧠 Suas reflexões 💭
                </h2>
                <b-field :label="LABEL_JaRefletiuSobreOAssunto">
                  <b-checkbox v-model="JaRefletiu">
                    Já fiz minha reflexão! 🤔
                  </b-checkbox>
                </b-field>

                <div v-if="JaRefletiu">
                  <b-field
                    label="😊 Você fez sua lição de casa! Se quiser compartilhar algumas de suas reflexões, use as perguntas abaixo:"
                  >
                    <b-select v-model="SelectedReflectionQuestion" expanded>
                      <option
                        v-for="opcao in opcoesAutoReflexao"
                        v-bind:key="opcao"
                        :value="opcao"
                      >
                        {{ opcao }}
                      </option>
                    </b-select>
                    <p class="control">
                      <b-button
                        type="is-primary"
                        @click="AdicionarAutoReflexao"
                        title="Adicionar reflexão"
                      >
                        <b-icon icon="plus" />
                      </b-button>
                    </p>
                  </b-field>

                  <div
                    v-for="reflexao in reflectionQuestions"
                    v-bind:key="reflexao.pergunta"
                  >
                    <b>{{ reflexao.pergunta }}</b>
                    <b-field>
                      <b-input
                        maxlength="500"
                        type="textarea"
                        v-model="reflexao.resposta"
                        expanded
                      >
                      </b-input>
                      <p class="control">
                        <b-button
                          size="is-large"
                          type="is-danger"
                          @click="RemoverAutoReflexao(reflexao)"
                          title="Remover reflexão"
                        >
                          <b-icon icon="delete" size="is-medium" />
                        </b-button></p
                    ></b-field>
                  </div>
                </div>
              </b-step-item>

              <b-step-item
                step="3"
                label="Áreas"
                :clickable="
                  DescricaoHabilidade != null && DescricaoHabilidade != ''
                "
                :type="{
                  'is-success':
                    DescricaoHabilidade != null && DescricaoHabilidade != '',
                }"
              >
                <h1 class="title has-text-centered">Áreas de Conhecimento</h1>
                <b-field :label="LABEL_AreasDeConexao">
                  <b-taginput
                    v-model="Areas"
                    ellipsis
                    icon="label"
                    :placeholder="LABEL_AreasDeConexaoPlaceholder"
                    @typing="getFilteredTags"
                    :data="possibleTags"
                    autocomplete
                    :allow-new="allowNew"
                    :open-on-focus="openOnFocus"
                  >
                  </b-taginput>
                </b-field>
              </b-step-item>

              <b-step-item
                :step="4"
                label="Referências"
                :clickable="
                  DescricaoHabilidade != null &&
                  DescricaoHabilidade != '' &&
                  Areas.length > 0
                "
                disabled
              >
                <h1 class="title has-text-centered">Referências de Apoio</h1>

                <b-field :label="LABEL_ConsegueDemonstrar" type="is-danger">
                  <div class="field">
                    <b-checkbox v-model="temMaterialReferencia">
                      Tenho material adicional
                    </b-checkbox>
                  </div>
                </b-field>
                <div v-if="temMaterialReferencia">
                  <b-field
                    label="Você tem algum material que possa ajudar a gente a ver"
                    type="is-danger"
                  >
                    <div class="block">
                      <b-radio
                        v-model="ExternalReferenceType"
                        name="name"
                        native-value="Link"
                      >
                        Link para referência externa (GitHub, Youtube, OneDrive,
                        Google Drive, Vimeo, etc.)
                      </b-radio>
                      <b-radio
                        v-model="ExternalReferenceType"
                        name="name"
                        native-value="Upload"
                      >
                        Upload de Vídeo
                      </b-radio>
                    </div>
                  </b-field>

                  <b-field
                    v-if="
                      WantsExternalReference && ExternalReferenceType == 'Link'
                    "
                    label="Qual a URL da referência externa?"
                  >
                    <b-input
                      placeholder="URL que demonstra a habilidade (e.g. oratória, captura de tela de desenvolvimento de sistema, resposta a entrevista, resolução de conflito)"
                      type="url"
                      v-model="ExternalReferenceURL"
                    ></b-input>
                  </b-field>
                  <b-field
                    v-if="
                      WantsExternalReference && ExternalReferenceType != 'Link'
                    "
                    label="Faça o seu Upload "
                  >
                    <video-recorder
                      :IdFeedBackRequest="IdFeedBackRequest"
                      @uploadComplete="videoUploaded($event)"
                    />
                  </b-field>
                </div> </b-step-item
              ><b-step-item
                :step="5"
                label="Final"
                :clickable="
                  DescricaoHabilidade != null &&
                  DescricaoHabilidade != '' &&
                  Areas.length > 0
                "
                disabled
              >
                <h1 class="title has-text-centered">Revise e Finalize</h1>
                <b-field :label="LABEL_REVISE_Esperado">
                  <section>
                    <b-message type="is-success">
                      {{ ResumoHabilidade }}
                    </b-message>
                  </section>
                </b-field>
                <b-field :label="LABEL_REVISE_Detalhes">
                  <section>
                    <b-message>
                      {{ DescricaoHabilidade }}
                    </b-message>
                  </section>
                </b-field>
                <b-field
                  v-if="OQueJaFez != null && OQueJaFez != ''"
                  label="Ações que você já executou para aprimorar"
                >
                  <section>
                    <b-message>
                      {{ OQueJaFez }}
                    </b-message>
                  </section>
                </b-field>
                <h2
                  v-if="reflectionQuestions.length > 0"
                  class="subtitle is-4 has-text-centered"
                >
                  🧠 Suas reflexões 💭
                </h2>
                <div
                  v-for="reflexao in reflectionQuestions"
                  v-bind:key="reflexao.pergunta"
                >
                  <b-message :title="reflexao.pergunta" :closable="false">
                    {{ reflexao.resposta }}
                  </b-message>
                </div>
                <br />
                <div class="box">
                  <b-field label="Áreas de Conhecimento">
                    <section>
                      <b-taglist>
                        <b-tag
                          type="is-warning"
                          v-for="tag in Areas"
                          :key="tag"
                          >{{ tag }}</b-tag
                        >
                      </b-taglist>
                    </section>
                  </b-field>
                  Cada uma dessas áreas será classificada de 1 a 5 pelo seu
                  dador de feedback.
                </div>
                <b-field
                  v-if="
                    WantsExternalReference &&
                    ExternalReferenceType != 'Link' &&
                    VideoStorageURL != null
                  "
                  label="Seu vídeo "
                >
                  <video
                    class="preview"
                    :src="VideoStorageURL"
                    controls
                  ></video>
                </b-field>
                <b-field
                  v-if="
                    temMaterialReferencia &&
                    WantsExternalReference &&
                    ExternalReferenceType == 'Link'
                  "
                  label="Seu link de referência para seu dador de Feedback"
                >
                  <a :href="ExternalReferenceURL" target="blank">{{
                    ExternalReferenceURL
                  }}</a>
                </b-field>
                <h2 class="subtitle is-4">
                  Peça <span v-if="wantsExpert">& Aguarde</span> seu Feedback
                  <span v-if="!wantsExpert"
                    >para amigos e colegas usando seu link</span
                  >
                </h2>
                Compartilhe seu pedido de feedback com pessoas de confiança!
                <span v-if="wantsExpert">
                  Vamos arrumar pessoas referência nessa habilidade para te dar
                  um feedback. Mas, você pode usar esse link para compartilhar e
                  pedir feedback de pessoas que já interagiram com você.
                </span>

                <br />
                <br />
                <b-message title="Sua URL compartilhável" :closable="false">
                  <b>IMPORTANTE:</b> Use esse link com cautela. Qualquer pessoa
                  que o obtiver poderá ver o seu pedido de feedback e fornecer
                  um feedback para você.
                  <br />
                  <br />

                  <b
                    >COPIE A SUA URL DE FEEDBACK SE QUISER PEDIR FEEDBACKS PARA
                    AMIGOS E COLEGAS (Este link ficará disponível em seu painel
                    de feedbacks.):</b
                  >
                  <span> {{ finalAteOFuturoShareURL }} </span>
                  <br />
                </b-message>
                <br />
                <div v-if="!wantsExpert">
                  <a
                    :href="finalLinkedInShareURL"
                    onclick="window.open(this.href, 'mywin',
'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;"
                  >
                    <b-button type="is-info" icon-left="linkedin">
                      Compartilhar no LinkedIn
                    </b-button> </a
                  ><br />
                  ( Para receber Feedbacks das suas conexões, recomendamos que
                  envie o pedido por mensagem)
                </div>

                <div v-if="wantsExpert">
                  <p
                    class="animate__animated animate__bounce animate__infinite"
                  >
                    ❗
                  </p>
                  <b
                    >Atenção: Você optou por um(a) expert Até o Futuro.
                    Analisaremos seu pedido e encontraremos uma pessoa para te
                    responder.</b
                  >
                  Se você deseja compartilhar esse pedido somente entre seus
                  amigos, volte ao Passo 1 e revise suas opções.
                  <br />
                  <br />
                </div>
              </b-step-item>
            </b-steps>
          </section>
        </div>
        <div class="column is-2">
          <b-progress :value="feedbackRequestQuality" type="is-info" />
          <b-button
            v-if="dicasParaMelhora.dicas.length > 0"
            @click="MostrarDicas"
            expanded
            type="is-info"
          >
            ℹ Dicas
          </b-button>
        </div>
      </div>
    </div>
  </layout-default>
</template>
 
<script>
import VideoRecorder from "../../components/VideoRecorder";
import firebase from "firebase";
import Areas from "../../CommonData/Areas.js";
import { VueSvgGauge } from "vue-svg-gauge";

const allTags = [...Areas];

export default {
  components: { VideoRecorder, VueSvgGauge },
  data() {
    return {
      // PREPARATION
      wantsExpert: true,

      isScrollable: false,
      maxHeight: 200,
      finalidadeAtual: { icon: "bike", text: "Habilidade" },
      finalidadesFeedback: [
        { icon: "bike", text: "Habilidade" },
        { icon: "lightbulb", text: "Ideia" },
        { icon: "flash", text: "Evento" },
      ],

      //////-----------------
      temMaterialReferencia: false,
      WantsExternalReference: true,
      ExternalReferenceType: "Link",
      allowNew: false,
      openOnFocus: true,
      Areas: [],
      possibleTags: allTags,
      IdFeedBackRequest: null,
      ExternalReferenceURL: null,
      VideoStorageURL: null,
      ResumoHabilidade: null,
      DescricaoHabilidade: null,
      FinalidadeHabilidade: null,
      OQueJaFez: null,
      JaRefletiu: false,
      SelectedReflectionQuestion: null,
      reflectionQuestions: [],
      activeStep: 0,

      showSocial: false,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: true,
      customNavigation: true,
      isProfileSuccess: false,

      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      labelPosition: "bottom",
      mobileMode: "minimalist",

      perguntasAutoFeedbackDisponiveis: [
        {
          tipoFeedback: "Habilidade",
          perguntas: [
            "Quais oportunidades você possui para melhorar essa habilidade?",
            "Quais são seus desafios com essa habilidade?",
            "Como essa habilidade está ligada com seus planos?",
            "Como essa habilidade está ligada com seu estilo de vida?",
            "Como essa habilidade está ligada com seus valores?",
            "Você tem mais exemplos de situações ou momentos em que essa habilidade é mais relevante?",
            "Como você imagina sua vida se você dominasse essa habilidade?",
            "Que situações você ainda não explorou em que você poderia demonstrar essa habilidade?",

            "Como uma pessoa que domina essa habilidade age ou te inspira?",
            "Como você resumiria o esforço que você já fez para aprimorar essa habilidade?",
            "O que você já fez e que parece ter funcionado para melhorar essa habilidade?",
            "Qual parece ser seu principal obstáculo?",
            "Desde o último feedback que você recebeu o que aconteceu a respeito dessa habilidade?",
            "O que de novo você conhece sobre esta habilidade?",
            "Você já tem algum plano de ação a respeito dessa habilidade? Como ele se parece?",
            "Descreva uma situação em que você se contentaria com relação ao domínio dessa habilidade. ",
          ],
        },
        {
          tipoFeedback: "Ideia",
          perguntas: [
            "Que problemas essa ideia parece resolver?",
            "Quais oportunidades você possui para melhorar essa ideia?",
            "Quais são seus desafios com essa ideia?",
            "Como essa ideia está ligada com seus planos?",
            "Como essa ideia está ligada com seu estilo de vida?",
            "Como essa ideia está ligada com seus valores?",
            "Você tem mais exemplos de situações ou momentos em que essa ideia é mais relevante?",

            "Como você imagina sua vida se essa ideia der certo?",
            "Que situações você ainda não explorou em que essa ideia poderia ser aplicada?",

            "Como você resumiria o esforço que você já fez para por essa ideia em prática?",
            "O que você já fez e que parece ter funcionado para colocar essa ideia em prática?",
            "Qual parece ser seu principal obstáculo?",
            "Desde o último feedback que você recebeu o que aconteceu a respeito dessa ideia?",
            "O que de novo você conhece que pode ajudar a colocar essa ideia em prática?",
            "Você já tem algum plano de ação a respeito dessa ideia? Como ele se parece?",
            "Descreva uma situação em que você se contentaria com relação ao sucesso dessa ideia. ",
          ],
        },
        {
          tipoFeedback: "Evento",
          perguntas: [
            "Qual foi o propósito desse evento?",
            "Quais oportunidades você possui para fazer um evento como esse melhor?",
            "Quais são seus desafios com esse tipo de evento?",
            "Como esse evento está ligado com seus planos?",
            "Como esse evento está ligado com seu estilo de vida?",
            "Como esse evento está ligadoa com seus valores?",
            "Você tem mais exemplos de situações ou momentos em que esse tipo de evento é mais relevante?",

            "Que situações você ainda não explorou que poderia melhorar esse em que esse tipo de evento?",

            "Como você resumiria o esforço que você já fez para executar esse tipo de evento?",
            "O que você já fez e que parece ter funcionado nesse evento?",
            "Qual parece ser seu principal obstáculo?",
            "Desde o último feedback que você recebeu você conseguiu ter novas ideias para esse tipo de evento?",
            "O que de novo você conhece que pode ajudar a melhorar esse evento?",
            "Você já tem algum plano de ação a respeito desse evento? Como ele se parece?",
            "Descreva uma situação em que você se contentaria com relação ao sucesso desse tipo de evento. ",
          ],
        },
      ], ////////////
    };
  },

  metaInfo() {
    return {
      title: `Até o Futuro - Dê seu feedback`,
      meta: [
        {
          name: "description",
          content: `Que tal se tornar uma pessoa mais fantástica por compartilhar um feedback?`,
        },
        {
          property: "og:title",
          content: `Até o Futuro - Dê seu feedback`,
        },
        { property: "og:site_name", content: "Até o Futuro" },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index,follow" },
      ],
    };
  },
  computed: {
    LABEL_DescrevaAlvoDoFeedback() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Sobre qual habilidade você gostaria de aprimorar e receber feedback?";
        case "Ideia":
          return "Descreva essa ideia em poucas palavras";
        case "Evento":
          return "Que tipo de evento é esse em poucas palavras?";
      }
      return "";
    },
    LABEL_DescrevaAlvoDoFeedbackPlaceholder() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Descreva a habilidade sobre a qual você quer feedback aqui de maneira breve.";
        case "Ideia":
          return "Descreva a sua ideia em poucas palavras. EX.: Aplicativo de Ajuda para Investimentos";
        case "Evento":
          return "Descreva seu evento em poucas palavras. EX.: Café da manhã virtual com meu time";
      }
      return "";
    },
    LABEL_DetalhesFinalidadeFeedback() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Detalhes da habilidade 🚴🏻‍♀️";
        case "Ideia":
          return "Detalhes da ideia 💡";
        case "Evento":
          return "Detalhes do evento ⚡";
      }
      return "";
    },
    LABEL_FinalidadeUsoFeedback() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Qual sua relação com essa habilidade atualmente?";
        case "Ideia":
          return "Finalidade da ideia";
        case "Evento":
          return "Finalidade do evento";
      }
      return "";
    },
    LABEL_FinalidadeUsoFeedbackPlaceholder() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Para quê você quer essa habilidade?";
        case "Ideia":
          return "Qual a principal finalidade dessa ideia?";
        case "Evento":
          return "Qual a principal finalidade desse evento?";
      }
      return "";
    },

    OPTIONS_FinalidadeUsoFeedback() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return [
            { value: "pessoal", text: "Aprimoramento pessoal/curiosidade" },
            {
              value: "novo-cargo",
              text: "Estou entrando em novo cargo/emprego",
            },
            { value: "dia-a-dia", text: "Preciso dela no dia-a-dia" },
            {
              value: "diferencial",
              text: "Quero me diferenciar no mercado de trabalho",
            },
          ];
        case "Ideia":
          return [
            { value: "novo-negocio", text: "Estou elaborando um novo negócio" },
            {
              value: "hackathon",
              text: "Estou participando de um hackathon ou competição",
            },
            {
              value: "dia-a-dia",
              text: "Quero melhorar meu trabalho/experiência no dia-a-dia",
            },
            {
              value: "ajudar-sociedade",
              text: "Quero ajudar a sociedade",
            },
          ];
        case "Evento":
          return [
            {
              value: "gerar-ideias",
              text: "Quero ter mais ideias sobre como resolver problemas",
            },
            {
              value: "tomar-decisoes",
              text: "Quero tomar decisões com um grupo",
            },
            {
              value: "informacoes",
              text: "Quero passar informações para pessoas",
            },
            {
              value: "trabalho-em-equipe",
              text: "Quero executar um trabalho com uma equipe",
            },
            {
              value: "criar-espirito-de-equipe",
              text: "Espírito de Equipe - Aproximar os membros do time",
            },
            {
              value: "networking",
              text:
                "Networking - Quero criar oportunidades para que pessoas conheçam umas às outras",
            },
            {
              value: "inspiracao",
              text:
                "Inspiração - Quero que as pessoas se inspirem umas com as outras",
            },
            {
              value: "reconhecimento",
              text:
                "Reconhecimento - Quero que eu ou meu trabalho seja reconhecido / Lembrado",
            },
            {
              value: "quebrar-rotina",
              text:
                "Quebrar a rotina - Quero que reenergizar as pessoas por fazê-las sair da rotina",
            },
            {
              value: "divulgar-negocio",
              text: "Divulgar Negócio ou Ideia",
            },
            {
              value: "revisitar-situacao",
              text:
                "Revisitar uma situação que poderia ter tido um resultado melhor",
            },
          ];
      }
      return [];
    },

    LABEL_ComoDemonstra() {
      var finalLabel =
        "Lembre-se de detalhar isso para ajudar a pessoa que vai te dar Feedback a entender o seu momento.";
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          if (this.ResumoHabilidade != null && this.ResumoHabilidade != "") {
            return `Quais são suas dificuldades em demonstrar a habilidade de "${this.ResumoHabilidade}" hoje em dia e sob quais circunstâncias você precisa dela? ${finalLabel}`;
          }
          return `Quais são suas dificuldades em demonstrar a habilidade acima hoje em dia e sob quais circunstâncias você precisa dela? ${finalLabel}`;
        case "Ideia":
          if (this.ResumoHabilidade != null && this.ResumoHabilidade != "") {
            `Qual o principal objetivo da ideia "${this.ResumoHabilidade}", e quais são suas dificuldades para colocá-la em prática? Quais são os problemas que ela resolve? ${finalLabel}`;
          }
          return "Qual o principal objetivo dessa ideia, e quais são suas dificuldades para colocá-la em prática? Quais são os problemas que ela resolve?";

        case "Evento":
          if (this.ResumoHabilidade != null && this.ResumoHabilidade != "") {
            return `Qual o principal objetivo do evento "${this.ResumoHabilidade}", e por que você acha importante realizá-lo? Quais são suas dificuldades e desafios? ${finalLabel}`;
          }
          return "Qual o principal objetivo desse evento e por que você acha importante realizá-lo? Quais são suas dificuldades e desafios?";
      }

      return "";
    },
    LABEL_ComoDemonstraPlaceholder() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "EXEMPLO: Detalhe alguns momentos em que você precisa dessa habilidade, dificuldades. Dê dados que ajudem seu feedback a ser mais específico.";
        case "Ideia":
          return "EXEMPLO: Dê mais contexto sobre essa ideia, mencione problemas que ela resolve. Que tipos de recurso você precisa para alcançá-la? Precisa de investimento? Quanto? Dê dados que ajudem seu feedback a ser mais específico.";
        case "Evento":
          return "EXEMPLO: Tente detalhar como foi (ou será esse evento), o que você deseja alcançar? Qual o comportamento esperado nas pessoas que participaram (ou participarão) dele? Dê dados que ajudem seu feedback a ser mais específico.";
      }
      return "";
    },
    LABEL_OQueVoceJafez() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Você fez algo para tentar aprimorar essa habilidade? Se sim, o quê?";
        case "Ideia":
          return "Qual foi a contribuição que você deu para essa ideia? O que você mais orgulha de ter feito para sua construção? O que você talvez tenha feito que pode melhorar?";
        case "Evento":
          return "O que você fez para que esse evento tivesse/tenha o melhor/mais positivo resultado possível? O que você acha que não surtiu o efeito desejado?";
      }
      return "";
    },
    LABEL_OQueVoceJafezPlaceholder() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Ex.: Li o livro XYZ, Entrevistei pessoas que são referência, pedi outros feedbacks no AteOFuturo, etc. ";
        case "Ideia":
          return "EX.: Fiz uma rodada de Design Thinking com meus amigos, Fiz entrevistas com pessoas que possuem o problema XYZ.";
        case "Evento":
          return "Ex.: Pedi para as pessoas se acalmarem, Entreguei convites digitais, ofereci um prêmio.";
      }
      return "";
    },

    LABEL_JaRefletiuSobreOAssunto() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Isso parece ser uma bobagem, mas marque esta caixinha se você já pensou em formas de aprimorar sua habilidade.";
        case "Ideia":
          return "Pode parecer estranho, mas você já refletiu sobre como essa ideia pode ser melhor?";
        case "Evento":
          return "Já parou para pensar como esse tipo de evento pode ter o melhor resultado possível?";
      }
      return "";
    },
    LABEL_PerguntasDeAutoFeedback() {
      return "";
    },

    LABEL_AreasDeConexao() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "A quais competências ou áreas ela está ligada? Escolher as áreas vai ajudar a gente a escolher a(s) pessoa(s) mais capacitada(s) para te dar um retorno de qualidade. Recomendamos pelo menos TRÊS áreas.";
        case "Ideia":
          return "A quais áreas essa ideia está ligada? Escolher as áreas vai ajudar a gente a escolher a(s) pessoa(s) mais capacitada(s) para te dar um retorno de qualidade. Recomendamos pelo menos TRÊS áreas.";
        case "Evento":
          return "A quais áreas esse evento está ligado? Escolher as áreas vai ajudar a gente a escolher a(s) pessoa(s) mais capacitada(s) para te dar um retorno de qualidade. Recomendamos pelo menos TRÊS áreas.";
      }
      return "";
    },
    LABEL_AreasDeConexaoPlaceholder() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Adicione uma ou mais TAGS (e.g. Javascript, Falar em Público, Desenvolvimento de Software)";
        case "Ideia":
          return "Adicione uma ou mais TAGS (e.g. Novos Negócios, Inovação)";
        case "Evento":
          return "Adicione uma ou mais TAGS (e.g. Inovação Aberta, Engajamento, Reuniões eficientes)";
      }

      return "";
    },

    LABEL_ConsegueDemonstrar() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Você tem algum material de referência que possa ajudar a gente a ver essa habilidade em ação hoje? (ex.: Links, Vídeos, Documentos, etc)";
        case "Ideia":
          return "Você tem algum material de referência que ajude a gente a entender melhor a ideia? (ex.: Links, Vídeos, Apresentações, etc)";
        case "Evento":
          return "Você tem algum material de referência que ajude a gente a enteder como evento funciona? (ex.: Links, Vídeos, Documentos, Fluxogramas, etc)";
      }
      return "";
    },

    LABEL_REVISE_Esperado() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Habilidade Esperada";
        case "Ideia":
          return "Ideia a ser avaliada";
        case "Evento":
          return "Evento/Tipo de Evento esperado";
      }
      return "";
    },
    LABEL_REVISE_Detalhes() {
      switch (this.finalidadeAtual.text) {
        case "Habilidade":
          return "Sua habilidade em mais detalhes";
        case "Ideia":
          return "Sua ideia em mais detalhes";
        case "Evento":
          return "Evento em mais detalhes";
      }
      return "";
    },
    LABEL_AdicionarOutraReferencia() {
      return "";
    },
    LABEL_QualityDeixeBarraVerde() {
      return this.feedbackRequestQuality <= 30
        ? "🙂 Tente deixar a barrinha verde!"
        : this.feedbackRequestQuality <= 60
        ? "😊 Está indo muito bem! Estamos melhorando a qualidade!"
        : this.feedbackRequestQuality <= 80
        ? "🤗 Vamos, só mais um pouco!"
        : this.feedbackRequestQuality < 100
        ? "🤩 A qualidade está muito boa. Só alguns pequenos detalhes para fechar com chave de ouro!"
        : '😍 SEU PEDIDO TÁ FENOMENAL! ❤🧠 Só marcar o gol e clicar em "Finalizar" no último passo.';
    },
    feedbackRequestQuality() {
      return this.dicasParaMelhora.percent;
    },
    opcoesAutoReflexao() {
      var thisVM = this;
      var returning = this.perguntasAutoFeedbackDisponiveis
        .filter((option) => {
          return option.tipoFeedback == thisVM.finalidadeAtual.text;
        })[0]
        .perguntas.filter((pergunta) => {
          return (
            thisVM.reflectionQuestions.filter((perguntaAutoReflexao) => {
              return pergunta === perguntaAutoReflexao.pergunta;
            }).length == 0
          );
        });
      return returning;
    },
    dicasParaMelhora() {
      var amountCriteria = 15;
      var finalSum = 0;
      var percent = 0;
      var dicasLocais = [];
      var URLpattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator

      if (this.ResumoHabilidade != null && this.ResumoHabilidade != "") {
        finalSum++;
        if (
          this.ResumoHabilidade.length > 5 &&
          this.ResumoHabilidade.length < 70
        ) {
          finalSum++;
        } else {
          dicasLocais.push(
            "Etapa 2 - Coloque um resumo sucinto entre 5 a 70 caracteres."
          );
        }
      } else {
        dicasLocais.push("Etapa 2 - Coloque um resumo sucinto.");
      }

      if (this.FinalidadeHabilidade != null && this.FinalidadeHabilidade) {
        finalSum++;
      } else {
        switch (this.finalidadeAtual.text) {
          case "Habilidade":
            dicasLocais.push(
              "Etapa 2 - Tente escolher a finalidade para a qual você precisa dessa habilidade."
            );
            break;

          case "Ideia":
            dicasLocais.push(
              "Etapa 2 - Tente escolher a finalidade para a qual você quer desenvolver essa ideia."
            );
            break;
          case "Evento":
            dicasLocais.push(
              "Etapa 2 - Se possível, tente escolher a finalidade para a qual você quer realizar esse tipo de evento."
            );
            break;
        }
      }

      if (this.DescricaoHabilidade != null && this.DescricaoHabilidade != "") {
        finalSum++;
        if (this.DescricaoHabilidade.length > 60) {
          finalSum++;
        } else {
          dicasLocais.push(
            "Etapa 2 - Se você usar mais palavras no detalhamento, vai ficar mais interessante seu pedido."
          );
        }
        if (this.DescricaoHabilidade.length > 150) {
          finalSum++;
        } else {
          dicasLocais.push(
            "Etapa 2 - Está ficando muito bom, tente detalhar mais um pouquinho."
          );
        }
        if (this.DescricaoHabilidade.length > 220) {
          finalSum++;
        } else {
          dicasLocais.push(
            "Etapa 2 - Parece que sua descrição já tem uma boa relevância, muito bom! Consegue colocar mais algumas palavras aí?"
          );
        }
      } else {
        dicasLocais.push(
          "Etapa 2 - Se você der uma detalhada/contextualizada, vai ficar bem mais fácil de entender o seu pedido."
        );
      }

      if (this.OQueJaFez != null && this.OQueJaFez != "") {
        finalSum++;
      } else {
        dicasLocais.push(
          "Etapa 2 - Você já fez algo para aprimorar antes de pedir o feedback? Tente se lembrar em pelo menos algo que você já fez."
        );
      }

      if (this.JaRefletiu) {
        finalSum++;
      } else {
        dicasLocais.push(
          "Etapa 2 - Pare um tempo, se possível, e reflita COM HONESTIDADE sobre como você pode ter o melhor resultado nesse assunto."
        );
      }

      this.reflectionQuestions.forEach((reflexao) => {
        if (reflexao.resposta != null && reflexao.resposta != "") {
          finalSum++;
        } else {
          dicasLocais.push(
            `Etapa 2 - Tente dizer um pouco sobre como foi sua reflexão em cima do ponto "${reflexao.pergunta}".`
          );
        }
      });

      if (this.Areas.length < 3) {
        dicasLocais.push(
          "Etapa 3 - Se você escolher três áreas pelo menos, a chance de você ter uma resposta do expert certo aumenta bastante!"
        );
      }
      finalSum += Math.min(this.Areas.length, 3);

      if (this.temMaterialReferencia) {
        finalSum++;
      } else {
        dicasLocais.push(
          "Etapa 4 - Um material de referência ajuda a deixar o pedido mais claro, mas não é obrigatório."
        );
      }

      if (
        (this.ExternalReferenceType == "Link" &&
          this.ExternalReferenceURL != null &&
          this.ExternalReferenceURL != "") ||
        (this.ExternalReferenceType == "Upload" &&
          this.VideoStorageURL != null &&
          this.VideoStorageURL != "")
      ) {
        finalSum++;

        if (
          this.ExternalReferenceURL != null &&
          this.ExternalReferenceURL != "" &&
          URLpattern.test(this.ExternalReferenceURL)
        ) {
          finalSum++;
        } else {
          dicasLocais.push(
            "Etapa 4 - Sua URL de referência não parece um endereço Web válido. "
          );
        }
      } else {
        dicasLocais.push(
          "Etapa 4 - Tente colocar uma URL de referência ou gravar um vídeo, pelo menos. Dá um pouco de trabalho e não é obrigatório, mas é uma oportunidade de você refletir mais sobre o seu pedido de feedback."
        );
      }

      percent = (finalSum / amountCriteria) * 100;

      return { dicas: dicasLocais, percent: percent };
    },
    dicaParaMelhora() {
      if (
        this.dicasParaMelhora.dicas != null &&
        this.dicasParaMelhora.dicas.length > 0
      ) {
        return this.dicasParaMelhora.dicas[0];
      }
      return "";
    },
    feedbackRequestQualityColor() {
      return this.feedbackRequestQuality <= 30
        ? "#DF0201"
        : this.feedbackRequestQuality <= 60
        ? "#FF8000"
        : this.feedbackRequestQuality <= 90
        ? "#F7FE2E"
        : this.feedbackRequestQuality < 100
        ? "#8CDFAD"
        : "#48c774";
    },
    finalLinkedInShareURL() {
      return `https://www.linkedin.com/shareArticle?mini=true&url=${this.finalAteOFuturoShareURL}&title=Dê%20um%20feedback%20e%20receba%205%20vantagens%20imediatas&summary=Olá!%20Que%20tal%20praticar%20a%20generosidade%20e%20dar%20um%20feedback%20para%20eu%20aprimorar%20minhas%20habilidades?!%20Até%20o%20Futuro!&source=AtéOFuturo`;
    },
    finalAteOFuturoShareURL() {
      return `https://AteOFuturo.com.br/DarFeedback/${this.IdFeedBackRequest}`;
    },
    isNextDisabled() {
      if (
        this.activeStep == 1 &&
        (this.DescricaoHabilidade == null || this.DescricaoHabilidade == "")
      ) {
        return true;
      }
      if (this.activeStep == 2 && this.Areas.length == 0) {
        return true;
      }
      if (
        this.activeStep == 3 &&
        this.temMaterialReferencia &&
        (this.VideoStorageURL == null || this.VideoStorageURL == "") &&
        (this.ExternalReferenceURL == null || this.ExternalReferenceURL == "")
      ) {
        return true;
      }
      if (this.activeStep == 4) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.startFeedbackRequest();
  },
  watch: {
    dicasParaMelhora() {
      if (!this.congratsAudioPlayed && this.dicasParaMelhora.percent >= 100) {
        var audio = new Audio(require("../../assets/sounds/Complete.mp3")); // path to file
        audio.play();
        this.congratsAudioPlayed = true;
      } else if (this.dicasParaMelhora.percent < 100) {
        this.congratsAudioPlayed = false;
      }
    },
    finalidadeAtual() {
      this.FinalidadeHabilidade = null;
    },
  },
  methods: {
    RemoverAutoReflexao(reflexao) {
      this.reflectionQuestions.pop(reflexao);
    },
    AdicionarAutoReflexao() {
      if (this.SelectedReflectionQuestion != null) {
        this.reflectionQuestions.push({
          pergunta: this.SelectedReflectionQuestion,
          resposta: "",
        });
        this.SelectedReflectionQuestion = null;
      } else {
        this.$buefy.dialog.alert({
          title: "Sobre o que refletir? 💭",
          message: "Selecione alguma pergunta de reflexão",
          type: "is-info",
          ariaRole: "alertdialog",
          ariaModal: true,
        });
      }
    },
    MostrarDicas() {
      var dicas = "";
      this.dicasParaMelhora.dicas.forEach((dica) => {
        dicas += `
            🔶 ${dica}
          <br/>`;
      });

      this.$buefy.dialog.alert({
        title: "Dicas para seu pedido 💪",
        message: dicas,
        type: "is-info",
        hasIcon: true,
        icon: "info",
        iconPack: "fa",
        ariaRole: "alertdialog",
        ariaModal: true,
      });
    },
    startFeedbackRequest() {
      if (this.IdFeedBackRequest == null) {
        this.IdFeedBackRequest = firebase
          .database()
          .ref()
          .child("/FeedbackRequests")
          .push().key;
      }
    },
    videoUploaded(url) {
      this.startFeedbackRequest();
      this.VideoStorageURL = url; 
      this.$buefy.toast.open(`Vídeo gravado!`);
    },
    gravarFinal() { 

      this.startFeedbackRequest();
      var thisVM = this;
      firebase
        .database()
        .ref("/FeedbackRequests/" + this.IdFeedBackRequest)
        .set({
          version: 2,
          TipoFeedback: this.finalidadeAtual.text,
          QuerExpert: thisVM.wantsExpert,
          DateTime: firebase.firestore.Timestamp.fromMillis(Date.now()),
          Resumo: thisVM.ResumoHabilidade,
          Detalhamento: thisVM.DescricaoHabilidade,
          AcoesTomadas: thisVM.OQueJaFez,
          JaRefletiu: thisVM.JaRefletiu,
          Reflexoes: thisVM.reflectionQuestions,
          TemMaterialReferencia: thisVM.temMaterialReferencia,
          QualidadePedido: thisVM.feedbackRequestQuality,

          ////////RETROCOMPATIBILIDADE

          FinalidadeHabilidade: thisVM.FinalidadeHabilidade,
          ResumoHabilidade: thisVM.ResumoHabilidade,
          DescricaoHabilidade: thisVM.DescricaoHabilidade,

          ///////////////

          Areas: thisVM.Areas,
          VideoStorageURL: thisVM.VideoStorageURL,
          ExternalReferenceURL: thisVM.ExternalReferenceURL,
          UserName: thisVM.$store.state.currentUser.displayName,
          UserId: thisVM.$store.state.currentUser.uid,
          UserEmail: thisVM.$store.state.currentUser.email,
          ExternalReferenceType: thisVM.ExternalReferenceType,
          WantsExternalReference: thisVM.WantsExternalReference,
        });

      this.$buefy.dialog.alert({
        message:
          "Deu tudo certo! Em breve você receberá um feedback sobre sua habilidade!",
        onConfirm: () => {
          this.$buefy.toast.open(`Feito`);
          this.$router.replace({
            name: "FeedbackDashboard",
          });
        },
      });
    },
    getFilteredTags(text) {
      this.possibleTags = allTags.filter((option) => {
        return option.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0;
      });
    },
  },
};
</script>