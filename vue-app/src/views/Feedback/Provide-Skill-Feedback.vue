<template>
  <div class="box">
    <vue-headful
      title="Feedback sobre habilidade"
      description="Forneça Feedback para uma habilidade"
    />
    <section>
      <h1 class="title is-3">
        <b-icon pack="fas" icon="user" type="is-success"> </b-icon> De
        {{ $root.$displayName }} para {{ feedBackRequest.UserName }}
      </h1>
    </section>
    <br />

    Agradecemos a generosidade de seu tempo, {{ feedBackRequest.UserName }}.
    <b-icon pack="fas" icon="heart" type="is-danger"> </b-icon> <br /><br />
    <a
      href="https://blog.claytonfreitas.com.br/cinco-vantagens-em-dar-feedback/"
      target="blank"
    >
      Esse Feedback vai te trazer cinco vantagens imediatas.
    </a>
    Além de um ato de generosidade para o próximo, que pode se torná-lo tão
    fantástico quanto você, dar um Feedback ativa o modo analítico em seu
    cérebro, e vai fazer você ser uma pessoa que tem boa sensibilidade em
    observar o que os outros têm de melhor.
    <br />
    <br />
    <b-field label="Habilidade Esperada">
      <section>
        <b-message type="is-success">
          {{ feedBackRequest.ResumoHabilidade }}
        </b-message>
      </section>
    </b-field>
    <b-field
      label="Detalhes sobre como a Habilidade é exercitada, dificuldades, etc."
    >
      <section>
        <b-message>
          {{ feedBackRequest.DescricaoHabilidade }}
        </b-message>
      </section>
    </b-field>
    <b-field
      label="Avalie como a habilidade se manifesta nas áreas de conhecimento envolvidas"
    >
      <b-message>
        <div v-for="area in RatedAreas" :key="area.Name">
          <b-tag type="is-warning">{{ area.Name }}</b-tag>
          <b-rate v-model="area.Rating"></b-rate><br />
        </div>
        <b-taglist> </b-taglist>
      </b-message>
    </b-field>
    <b-field
      v-if="
        feedBackRequest.WantsExternalReference &&
        feedBackRequest.ExternalReferenceType == 'Youtube'
      "
      label="Qual a URL do Vídeo?"
    >
      <b-input
        placeholder="URL para o vídeo onde você descreve ou demonstra a habilidade (e.g. oratória, captura de tela de desenvolvimento de sistema, resposta a entrevista, resolução de conflito)"
        type="url"
      ></b-input>
    </b-field>
    <b-field
      v-if="
        feedBackRequest.WantsExternalReference &&
        feedBackRequest.ExternalReferenceType != 'Link' &&
        feedBackRequest.VideoStorageURL != null
      "
      label="Vídeo de demonstração"
    >
      <video
        class="preview"
        :src="feedBackRequest.VideoStorageURL"
        controls
      ></video>
    </b-field>
    <b-field
      v-if="
        feedBackRequest.WantsExternalReference &&
        feedBackRequest.ExternalReferenceType == 'Link'
      "
      label="Link de Referência"
    >
      <a :href="feedBackRequest.ExternalReferenceURL" target="blank">{{
        feedBackRequest.ExternalReferenceURL
      }}</a>
    </b-field>
    <b-field
      label="O que você acha que a pessoa deve continuar fazendo?"
      type="is-success"
    >
      <b-input
        placeholder="Foque nas qualidades positivas demonstradas pela pessoa. Pense em momentos em que demonstrar determinados aspectos dessa habilidade, você vê que a pessoa inspira, ou move outros à ação e apreciação."
        type="textarea"
        minlength="10"
        maxlength="365"
        :loading="$root.isLoading"
        v-model="ContinuarFazendo"
      ></b-input>
    </b-field>
    <b-field
      label="O que você acha que a pessoa deve evitar fazer?"
      type="is-danger"
    >
      <b-input
        placeholder="Pense em momentos em que você demonstrou determinados traços dessa habilidade e que o resultado não foi o esperado, ou foi excessivamente negativo."
        type="textarea"
        minlength="10"
        maxlength="365"
        :loading="$root.isLoading"
        v-model="EvitarFazer"
      ></b-input>
    </b-field>
    <b-field
      label="O que você acha que a pessoa deve passar a fazer?"
      type="is-info"
    >
      <b-input
        placeholder="O que você acha que vai potencializar ou maximizar a apreciação de outros na habilidade sendo aprimorada?"
        type="textarea"
        minlength="10"
        maxlength="365"
        :loading="$root.isLoading"
        v-model="PassarAFazer"
      ></b-input>
    </b-field>
    <b-field
      label="Habilidade precisa ser aprimorada para a seguinte finalidade"
    >
      <b-select
        v-model="feedBackRequest.FinalidadeHabilidade"
        expanded
        disabled
      >
        <option value="pessoal">Aprimoramento pessoal/curiosidade</option>
        <option value="novo-cargo">
          A pessoa está entrando em novo cargo/emprego
        </option>
        <option value="dia-a-dia">A pessoa precisa dela no dia-a-dia</option>
        <option value="diferencial">
          A pessoa quer se diferenciar no mercado de trabalho
        </option>
      </b-select>
    </b-field>
    <button @click="gravarFinal" class="button is-success">
      Finalizar Feedback
    </button>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  name: "provide-skill-feedback",
  //props: ["idFeedbackRequest"],
  data() {
    return {
      idFeedbackRequest: null,
      feedBackRequest: {},
      feedbackText: null,
      RatedAreas: [],
      ContinuarFazendo: null,
      EvitarFazer: null,
      PassarAFazer: null,
      ItensfeedBackRequest: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    gravarFinal: function () {},
    clearData: function () {
      var thisVM = this;
      thisVM.ItensfeedBackRequest.splice(0, this.ItensfeedBackRequest.length);
    },
    getData() {
      var thisVM = this;
      thisVM.$root.startLoading();
      thisVM.clearData();
      var feedBackRequest = firebase
        .database()
        .ref(`FeedbackRequests/${thisVM.$route.params.IdFeedbackRequest}`);

      feedBackRequest.on("value", function (snapshot) {
        thisVM.feedBackRequest = snapshot.val();
        thisVM.feedBackRequest.Areas.forEach((area) => {
          thisVM.RatedAreas.push({ Name: area, Rating: null });
        });
        thisVM.$root.stopLoading();
      });
    },
  },
};
</script>