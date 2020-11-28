<template>
  <div class="tag-input">
    <b-field>
      <b-autocomplete
        rounded
        v-model="name"
        :data="filteredDataArray"
        group-field="type"
        group-options="items"
        placeholder="Inclua uma tag e ENTER (e.g. Comunicação, Javascript)"
        icon="magnify"
        clearable
        clear-on-select
        v-on:keyup.delete="removeLastTag"
        @keyup.delete="removeLastTag"
        @keydown.backspace="removeLastTag"
        open-on-focus
        @select="(option) => addNewTag(option)"
      >
        <template slot="empty">Nenhum resultado encontrado</template>
      </b-autocomplete>
      <div class="box  tag-input__tag">
        <b-tag v-for="tag in tags" :key="tag"
          type="is-primary"
          closable
          aria-close-label="Close tag"
          @close="removeTagByName(tag)"
        >
          {{ tag }}
        </b-tag> </div> 
    </b-field>
  </div>
</template> 


<style scoped>
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input__tag {
  height: 30px; 
  margin-right: 10px;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>
<script>
export default {
  name: "TagInput",
  data() {
    return {
      name: "",
      selected: null,
      possibleTags: [
        {
          type: "Geral",
          items: [
            "Idiomas",
            "Comunicação",
            "Liderança",
            "Criatividade",
            "Colaboração",
            "Adaptabilidade",
            "Flexibilidade",
            "Raciocínio Analítico",
            "Gerenciamento de Pessoas",
            "Vendas",
            "Processamento de Linguagem Natural",
            "Estratégias Corporativas",
          ],
        },
        {
          type: "Empreendedorismos & Administração",
          items: [
            "Idiomas",
            "Comunicação",
            "Liderança",
            "Criatividade",
            "Colaboração",
            "Gerenciamento de Pessoas",
            "Vendas",
            "Estratégias Corporativas",
          ],
        },

        {
          type: "Idiomas",
          items: ["Tradução", "Inglês", "Espanhol", "Sueco"],
        },
        {
          type: "Áudio e Vídeo",
          items: ["Produção de Vídeos", "Produção de Áudio"],
        },
        {
          type: "Tecnologia",
          items: [
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
            "Marketing",
            "Jornalismo",
          ],
        },
        {
          type: "Comunicação",
          items: [
            "Persuasão",
            "Discurso",
            "Prática para Entrevista",
            "Comunicação Corporativa",
            "Marketing Digital",
            "Marketing em Mídias Sociais",
            "Mídias Sociais",
            "Marketing",
            "Jornalismo",
          ],
        },
        {
          type: "Desenvolvimento de Software",
          items: [
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
          ],
        },
      ],
      tags: [],
    };
  },
  methods: {
    addTag(event) {
      event.preventDefault();
      var val = event.target.value.trim();
      if (val.length > 0) {
        this.tags.push(val);
        event.target.value = "";
      }
    },
    addNewTag(value) {
      if (value != null) {
        this.tags.push(value);
        this.name = "";
      }
    },

    removeTag(index) {
      this.tags.splice(index, 1);
    },
    removeTagByName(index) {
      this.tags.splice(index);
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1);
      }
    },
  },
  computed: {
    filteredDataArray() {
      return this.possibleTags.filter((option) => {
        return (
          option.toString().toLowerCase().indexOf(this.name.toLowerCase()) >= 0
        );
      });
    },
  },
};
</script>