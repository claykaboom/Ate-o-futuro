<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Preferências</p>
      <button class="delete"></button>
    </header>
    <section class="modal-card-body">
      <label class="label">Nome</label>
      <p class="control">
        <input
          class="input"
          placeholder="Seu nome"
          type="text"
          :value="$store.state.displayName"
          disabled
        />
      </p>

      <label class="label">Mini biografia</label>
      <p class="control">
        <textarea
          class="textarea"
          placeholder="Descreva-se"
          v-model="mutableMiniBio"
        ></textarea>
      </p>

      <b-field label="URL da sua foto de perfil">
        <b-input
          placeholder="URL para sua foto de perfil"
          type="url"
          icon="camera"
          v-model="mutablePhotoURL"
        ></b-input>
      </b-field>
      <b-field label="Quais são suas áreas de expertise?">
        <b-taginput
          v-model="mutableAreas"
          ellipsis
          icon="label"
          placeholder="Adicione uma ou mais TAGS (e.g. Javascript)"
          @typing="getFilteredTags"
          :data="possibleTags"
          autocomplete
          :allow-new="allowNew"
          :open-on-focus="true"
        >
        </b-taginput>

      
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <a class="button is-primary modal-save" @click="save()"
        >Salvar mudanças</a
      >
      <a class="button modal-cancel" @click="$emit('close')">Cancelar</a>
    </footer>
  </div>
</template>
<script>
const allTags = [
  "Idiomas",
  "Comunicação",
  "Criatividade",
  "Colaboração",
  "Adaptabilidade",
  "Flexibilidade",
  "Raciocínio Analítico",
  "Vendas",
  "Processamento de Linguagem Natural",
  "Estratégias Corporativas",
  "Agilidade",
  "Kanban",
  "Scrum",
  "Parenting",
  "Matemática",
  "Liderança",

  "Tradução",
  "Inglês",
  "Espanhol",
  "Sueco",
  "Produção de Vídeos",
  "Produção de Áudio",
  "Desenvolvimento de Software",
  "Computação em Nuvem",
  "Inteligência Artificial",
  "Aplicações Móveis",
  "Persuasão",
  "Discurso",
  "Prática para Entrevista",
  "Comunicação Corporativa",
  "Marketing Digital",
  "Marketing em Mídias Sociais",
  "Mídias Sociais",
  "Jornalismo",
  "Desenho",
  "Desenho Digital",
  "Pintura",
  "Pintura Aquarela",
  "Pintura Óleo",
  "Pintura com Lápis de Cor",
  "Pintura Digital",
  "Tratamento de Imagens",
  "Photoshop (e ferramentas de imagens)",
  "Arquitetura de TI",
  "Arquitetura de Corporativa",
  "Inteligência Interpessoal",
  "Planejamento de Carreiras",
  "Pitch de Negócios",
  "Dicção",
  "Gamification",
  "Inovação",
  "Apresentações",
  "Falar em público",
  "Storytelling",
  "RPA - Robotic Process Automation",
  "Inovação aberta",
  "Trabalho em equipe",

  "Marketing pessoal ",
  "Negociação",

  "Processos ITIL",
  "Gestão de Projetos",

  "Clareza de Demonstração de Ideias",
  "Educação",
  "Meta-aprendizado",

  "Desenvolvimento Humano",
  "RH",
  "Coaching",
  "Recrutamento",
  "Entrevista",
  "Carreira",
  "Gestão - Gerenciamento de Pessoas",
  "Aprendizagem",
  "OKRs",
  "Experimentação",
  "Lean Startup",
  "Treinamento",
  "Marketing",
  "Desenvolvimento de Jogos",
  "Teste de Software",
  "Javascript",
  "Python",
  "Node.js",
  "Polymer",
  "React",
  "RxJS",
  "Vue.js",
  "No Code - Low Code",

  "Fotografia",
  "Exposição (Fotografia)",
  "Regra dos terços (Fotografia)",
  "Iluminação (Fotografia)",
];

export default {
  name: "EditPerfil",
  props: ["miniBio", "photoURL", "areas","allow-new"],
  data() {
    return {
      Areas: [],
      possibleTags: allTags,
      mutableMiniBio: this.miniBio ? this.miniBio.toString() : "",
      mutablePhotoURL: this.photoURL ? this.photoURL.toString() : "",
      mutableAreas: [],
    };
  },
  watch: {
    areas() { 
      this.mutableAreas = this.areas;
    },
  },
  mounted(){

      this.mutableAreas = this.areas;
  },

  methods: {
    getFilteredTags(text) {
      this.possibleTags = allTags.filter((option) => {
        return option.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0;
      });
    },
    save() {
      

      if ((this.mutableAreas == null || this.mutableAreas.length == 0)) {
        this.$buefy.dialog.alert({
          message: "Selecione pelo menos uma área de expertise",
          onConfirm: () => {},
        });
      } else {
        var data = {
          miniBio: this.mutableMiniBio,
          photoURL: this.mutablePhotoURL,
          areas: this.mutableAreas,
        };
        this.$emit("save", data);
      }
    },
  },
};
</script>