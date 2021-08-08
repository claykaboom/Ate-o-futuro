<template>
  <div>
    <transition-group name="list" tag="div"> </transition-group>

    <section class="container">
      <!-- <div class="level-item">
        <div
          class="columns is-multiline is-centered cards-container"
          id="sectioncontainer"
        >
          <div class="column">
            <article class="message is-black">
              <div class="message-header">
                <p>Lista de características</p>
              </div>
              <div class="message-body">
                <drop class="column box" mode="cut" @drop="onPlaceAtBacklog">
                  <div class="board-item">
                    <div class="board-item-content">
                      <b-taglist>
                        <drag
                          v-for="n in traitsBacklog"
                          :key="n"
                          :data="n"
                          @cut="remove(n)"
                          ><b-tag>{{ n }}</b-tag></drag
                        >
                      </b-taglist>
                    </div>
                  </div>
                </drop>
              </div>
            </article>
          </div>
          <div class="column">
            <article class="message is-success">
              <div class="message-header">
                <p>Demonstra</p>
              </div>
              <div class="message-body">
                <drop
                  class="column box"
                  @drop="onPlacedAtDisplayedTraits"
                  mode="cut"
                >
                  <div class="board-item">
                    <div class="board-item-content">
                      <b-taglist>
                        <drag
                          v-for="(n, index) in displayedTraits"
                          :key="index"
                          :data="n"
                          @cut="removeItemFrom(n, '1')"
                        >
                          <b-tag type="is-success">{{ n }}</b-tag>
                        </drag></b-taglist
                      >
                    </div>
                  </div>
                </drop>
              </div>
            </article>
          </div>
          <div class="column">
            <article class="message is-danger">
              <div class="message-header">
                <p>Não demonstra</p>
              </div>
              <div class="message-body">
                <drop
                  class="column box"
                  @drop="onPlaceAtNotDisplayedTraits"
                  mode="cut"
                >
                  <div class="board-item">
                    <div class="board-item-content">
                      <b-taglist>
                        <drag
                          v-for="(n, index) in notDisplayedTraits"
                          :key="index"
                          :data="n"
                          @cut="removeItemFrom(n, '2')"
                        >
                          <b-tag type="is-warning">{{ n }}</b-tag>
                        </drag></b-taglist
                      >
                    </div>
                  </div>
                </drop>
              </div>
            </article>
            
          </div>
         
        </div>
      </div>  -->
      <section>
        <div class="columns">
          <div class="column box">
            <b-field v-for="trait in get14traits(1)" :key="trait">
              <b-checkbox
                v-model="displayedTraits"
                :native-value="trait"
                type="is-success"
              >
                <span>{{ trait }}</span>
              </b-checkbox>
            </b-field>
          </div>
          <div class="column box">
            <b-field v-for="trait in get14traits(2)" :key="trait">
              <b-checkbox
                v-model="displayedTraits"
                :native-value="trait"
                type="is-success"
              >
                <span>{{ trait }}</span>
              </b-checkbox>
            </b-field>
          </div>
          <div class="column box">
            <b-field v-for="trait in get14traits(3)" :key="trait">
              <b-checkbox
                v-model="displayedTraits"
                :native-value="trait"
                type="is-success"
              >
                <span>{{ trait }}</span>
              </b-checkbox>
            </b-field><br/>
          </div>
          <div class="column box">
            <b-field v-for="trait in get14traits(4)" :key="trait">
              <b-checkbox
                v-model="displayedTraits"
                :native-value="trait"
                type="is-success"
              >
                <span>{{ trait }}</span>
              </b-checkbox> 
            </b-field>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { Drag, Drop, DropMask } from "vue-easy-dnd";

const traits = [
  "alegre",
  "amável",
  "amoroso (a)",
  "astuto (a)",
  "atencioso (a)",
  "ativo (a)",
  "audacioso (a)",
  "autoconfiante",
  "calmo (a)",
  "capaz",
  "complicado (a)",
  "compreensivo (a)",
  "comprometido (a)",
  "confiante",
  "confiável (a)",
  "corajoso (a)",
  "cordial",
  "disposto (a)",
  "envergonhado (a)",
  "esperto (a)",
  "espontâneo (a)",
  "extrovertido (a)",
  "flexível",
  "generoso (a)",
  "gentil (a)",
  "habilidoso (a)",
  "honrado (a)",
  "idealista",
  "impaciente",
  "independente",
  "informado (a)",
  "inteligente (a)",
  "introvertido (a)",
  "maduro (a)",
  "minucioso (a)",
  "modesto (a)",
  "observador (a)",
  "organizado (a)",
  "orgulhoso (a)",
  "paciente",
  "perspicaz",
  "poderoso (a)",
  "prestativo (a)",
  "quieto (a)",
  "racional",
  "reflexivo (a)",
  "religioso (a)",
  "sagaz",
  "satisfeito (a)",
  "sensato (a)",
  "sentimental",
  "sincero (a)",
  "tenso (a)",
  "tímido (a)",
  "tolo (a)",
  "tranquilo (a)",
];

export default {
  components: { Drag, Drop, DropMask },
  props: {
    options: {
      type: Array,
      default: function () {
        return ["🤮", "2", "3", "4", "😐", "6", "7", "8", "9", "🚀"];
      },
    },
    questionTitle: {
      type: String,
      default:
        "Qual a probabilidade de você recomendar o Até o Futuro para outras pessoas que estão buscando ter a melhor versão de si no Futuro?",
    },
    questionDescription: {
      type: String,
      default:
        " Conhece pessoas que estão querendo entrar no mercado de trabalho? Mudar de profissão? Você nos indicaria para elas?",
    },
    lowRateText: {
      type: String,
      default: "Muito improvável! 🤮",
    },
    highRateText: {
      type: String,
      default: "Muito provável! 🚀",
    },
  },
  data() {
    return {
      value: null,
      traitsBacklog: [...traits],
      traitsBacklogCheckBox: [...traits],
     
      notDisplayedTraits: [],
      displayedTraits: [],
    };
  },
  methods: {
    onCopyDrop(e) {
      this.copied.push(e.data);
    },
    onCutDrop(e) {
      this.cut.push(e.data);
    },
    remove(n) {
      let index = this.traitsBacklog.indexOf(n);
      this.traitsBacklog.splice(index, 1);
    },
    removeItemFrom(n, origin) {
      let index = 0;
      switch (origin) {
        case "1":
          index = this.displayedTraits.indexOf(n);
          this.displayedTraits.splice(index, 1);
          break;
        case "2":
          index = this.notDisplayedTraits.indexOf(n);
          this.notDisplayedTraits.splice(index, 1);

          break;
        default:
          index = this.traitsBacklog.indexOf(n);
          this.traitsBacklog.splice(index, 1);
          break;
      }
    },

    onPlaceAtBacklog(e) {
      this.traitsBacklog.push(e.data);
    },
    onPlacedAtDisplayedTraits(e) {
      this.displayedTraits.push(e.data);
    },
    onPlaceAtNotDisplayedTraits(e) {
      this.notDisplayedTraits.push(e.data);
    },
    get14traits(batch, amountOfItems) {
      
      amountOfItems  = amountOfItems ? amountOfItems: 14;
      var data = this.traitsBacklogCheckBox.slice(
        (batch - 1) * amountOfItems,
        batch * amountOfItems
      );
      return data;
    },
  },
  computed: {
    currentText() {
      return this.options[this.value - 1];
    },
  },
};
</script>

<style>
#sectioncontainer {
  margin-top: 20px;
}

/* Keep from sticking to sides */
.cards-container {
  max-width: 95%;
}

.board-item {
  margin: 5px 0;
  will-change: transform;
}

.board-item-content {
  word-break: break-all;
  position: relative;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  font-size: 17px;
  text-align: center;
  cursor: pointer;
  -webkit-box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
  margin: 5px;
}

.delete {
  pointer-events: auto;
}

footer {
  margin-top: 2rem;
}
.drag {
  width: 60px;
  height: 60px;
  background-color: rgb(220, 220, 255);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 0 10px;
  font-size: 20px;
  transition: all 0.5s;
}

.group {
  display: flex;
}

.copy {
  margin: 20px 10px;
  border: 1px solid black;
  height: 100px;
  display: inline-block;
  position: relative;
  flex: 1;
}

.cut {
  margin: 20px 10px;
  border: 1px solid black;
  height: 100px;
  display: inline-block;
  position: relative;
  flex: 1;
}

.copy::before {
  content: "COPY";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgba(0, 0, 0, 0.4);
  font-size: 25px;
  font-weight: bold;
}

.cut::before {
  content: "CUT";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgba(0, 0, 0, 0.4);
  font-size: 25px;
  font-weight: bold;
}

.drop-allowed {
  background-color: rgba(0, 255, 0, 0.2);
}

.drop-forbidden {
  background-color: rgba(255, 0, 0, 0.2);
}

.drop-in {
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.4);
}

.list-enter,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
