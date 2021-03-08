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
      <b-field label="URL do seu perfil no LinkedIn">
        <b-input
          placeholder="https://linkedin.com/in/SEUPERFIL"
          type="url"
          icon="linkedin"
          v-model="mutableLinkedInURL"
        ></b-input>
      </b-field>
      <b-field label="WhatsApp para contato com nosso chatbot">
        <b-input
          placeholder="+5511XXXXX-XXXX"
          type="phone"
          icon="phone"
          v-cleave="masks.phone"
          v-model="mutableWhatsAppNumber"
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
import Areas from "../../CommonData/Areas";
require("cleave.js/dist/addons/cleave-phone.br");
import Cleave from "cleave.js";

const allTags = [...Areas];

const cleave = {
  name: "cleave",
  bind(el, binding) {
    const input = el.querySelector("input");
    input._vCleave = new Cleave(input, binding.value);
  },
  unbind(el) {
    const input = el.querySelector("input");
    input._vCleave.destroy();
  },
};

export default {
  directives: { cleave },
  name: "EditPerfil",
  props: [
    "miniBio",
    "linkedInURL",
    "photoURL",
    "whatsAppNumber",
    "areas",
    "allow-new",
  ],
  data() {
    return {
      Areas: [],
      possibleTags: allTags,
      mutableMiniBio: this.miniBio ? this.miniBio.toString() : "",
      mutableLinkedInURL: this.linkedInURL ? this.linkedInURL.toString() : "",
      mutablePhotoURL: this.photoURL ? this.photoURL.toString() : "",
      mutableWhatsAppNumber: this.whatsAppNumber
        ? this.whatsAppNumber.toString()
        : "",
      mutableAreas: [],
      masks: {
        phone: {
          phone: true,
          phoneRegionCode: "BR",
        },
      },
    };
  },
  watch: {
    areas() {
      this.mutableAreas = this.areas;
    },
  },
  mounted() {
    this.mutableAreas = this.areas;
  },

  methods: {
    getFilteredTags(text) {
      this.possibleTags = allTags.filter((option) => {
        return option.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0;
      });
    },
    save() {
      if (this.mutableAreas == null || this.mutableAreas.length == 0) {
        this.$buefy.dialog.alert({
          message: "Selecione pelo menos uma área de expertise",
          onConfirm: () => {},
        });
      } else {
        var data = {
          miniBio: this.mutableMiniBio,
          photoURL: this.mutablePhotoURL,
          linkedInURL: this.mutableLinkedInURL,
          whatsAppNumber: this.mutableWhatsAppNumber,
          areas: this.mutableAreas,
        };
        this.$emit("save", data);
      }
    },
  },
};
</script>