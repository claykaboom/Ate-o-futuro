<template>
  <empty-layout>
    <vue-headful
      title="Até o Futuro 🛠 - Caixa de Ferramentas de colaboração criativa"
      description="Seu EU do Futuro aprimorado."
    />
    <section
      class="hero main_hero is-fullheight AteOFuturoBG"
      :style="`background-image: url('${require('@/assets/Background-Toolbox.jpg')}');  background-size: cover;`"
    >
      <div class="hero-head">
        <div class="first_nav">
          <div class="container">
            <!-- Menu -->
            <nav-bar :fixedTop="true" />
          </div>
        </div>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="slider-summay animated zoomIn pb-6">
            <div>
              <p
                class="title is-1 main-text animate__animated animate__heartBeat"
              >
                Caixa de Ferramentas
                <span v-if="$store.state.currentUser"
                  >de {{ $store.state.displayName }}</span
                >
              </p>
              <p
                class="subtitle is-4 main-text animate__animated animate__fadeInUp"
              >
                Utilize esta caixa de ferramentas com curadoria do Até o Futuro
                para aplicar colaboração criativa e destravar o seu potencial,
                do seu time, ou de sua empresa.
              </p>
            </div>
          </div>
          <span class="scroll-down animated zoomIn">
            <svg
              width="30px"
              height="100%"
              viewBox="0 0 247 390"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style="
                fill-rule: evenodd;
                clip-rule: evenodd;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 1.5;
              "
            >
              <path
                id="wheel"
                d="M123.359,79.775l0,72.843"
                style="fill: none; stroke: #fff; stroke-width: 20px"
              />
              <path
                id="mouse"
                d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
                style="fill: none; stroke: #fff; stroke-width: 20px"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
    <section>
      <div v-if="$store.state.isLoading" class="row columns is-multiline">
        <div class="card column is-3" v-for="i in 16" :key="i">
          <figure class="media-left">
            <p class="image is-64x64">
              <b-skeleton circle width="64px" height="64px"></b-skeleton>
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <b-skeleton active></b-skeleton>
                <b-skeleton height="80px"></b-skeleton>
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small">
                    <b-skeleton></b-skeleton>
                  </span>
                </a>
                <a class="level-item">
                  <span class="icon is-small">
                    <b-skeleton></b-skeleton>
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div class="box">
        <h2 class="subtitle is-3">Encontre a ferramenta certa para você</h2>
        <div class="row columns">
          <div class="card column is-4">
            Busca por categoria:
            <b-checkbox-button
              v-model="categoriasSelecionadas"
              v-for="categoria in categoriasDisponiveis"
              :key="categoria.nome"
              :native-value="categoria"
              :type="categoria.type" :title="categoria.tooltip"
            >
              <b-icon :icon="categoria.icon"></b-icon>
              <span>{{ categoria.nome }}</span>
            </b-checkbox-button>
          </div>
          <div class="card column is-4">
            <b-field :label="`⏱ Tempo disponível (${duracaoSelecionada}  minutos):`">
              <b-slider
                :min="minDuracaoDisponivel"
                :max="maxDuracaoDisponivel"
                v-model="duracaoSelecionada"
                :step="15"
                :tooltip="true"
                ticks
              />
            </b-field>
          </div>
          <div class="card column is-4">
            <b-field :label="`👥 Tamanho do time [${tamanhoTimeSelecionado} pessoa(s)]:`">
              <b-slider
                :min="minTamanhoTimeDisponivel"
                :max="maxTamanhoTimeDisponivel"
                v-model="tamanhoTimeSelecionado"
                :step="1"
                :tooltip="true"
                ticks
              />
            </b-field>
          </div>
        </div>
        <div class="row columns is-multiline">
          <div
            v-for="(card, index) in filteredTools"
            v-bind:key="card.id"
            class="column is-3"
            style="cursor: pointer"
            @mouseover="hoverCard(index)"
            @mouseout="hoverCard(-1)"
            :class="{
              'animate__animated animate__pulse fast': isSelected(index),
            }"
          >
            <div  
              class="card large"
              @click="
                $router.push({
                  name: 'ToolDetail',
                  params: { toolId: card.id },
                })
              "
            >
              <div class="card-image">
                <b-image :src="card.imageURL" ratio="16by9" />
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-32x32">
                      <img :src="card.avatar" alt="Image" />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4 no-padding">{{ card.name }}</p>
                  </div>
                </div>
                <div class="content">
                  {{ card.summary }}
                </div>
              </div>
              <footer class="card-footer">
                <div class="card-footer-item">
                  <b-icon icon="account" /> {{ card.minTeamSize }} -
                  {{ card.maxTeamSize }}
                </div>
                <div class="card-footer-item">
                  <b-icon icon="clock" /> {{ card.minTime }} -
                  {{ card.maxTime }}
                </div>
              </footer>
            </div>
          </div>
        </div>
        <h3 class="subtitle is-4">
          Quer saber mais sobre o Até o Futuro ou sugerir algo?
        </h3>
        <div class="row columns">
          <div class="column is-6">
            <router-link
              :to="{ name: 'Sobre' }"
              class="button is-white is-large is-inverted is-fullwidth"
            >
              Explore o Até o Futuro &nbsp;&nbsp;&ensp;⚡
            </router-link>
          </div>

          <div class="column is-6">
            <router-link
              :to="{ name: 'Contato' }"
              class="button is-success is-large is-fullwidth"
            >
              Fale com a gente &nbsp;&nbsp;&ensp;✉
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </empty-layout>
</template>
<style>
.fast {
  --animate-duration: 0.2s;
}
</style>
<script>
import NavBar from "../../components/NavBar";
import firebase from "firebase";

export default {
  components: { NavBar },
  data() {
    return {
      duracaoSelecionada: 1,
      tamanhoTimeSelecionado: 1,
      minDuracaoDisponivel: 30,
      maxDuracaoDisponivel: 240,
      minTamanhoTimeDisponivel: 1,
      maxTamanhoTimeDisponivel: 10,
      categoriasDisponiveis: [
        { icon: "account", nome: "Time", type: "is-danger", tooltip:"Dinâmicas para aproximar o time e refinar o modelo de trabalho" },
        { icon: "video", nome: "Video", type: "is-info", tooltip:"Vídeos para reflexão e aprendizado" },
        { icon: "run", nome: "Ação", type: "is-success" , tooltip:"Dinâmicas de ação para aplicar um método"},
        { icon: "flash-outline", nome: "Energizante", type: "is-success" , tooltip:"Maneiras de quebrar o gelo e dar energia para o time"},
      ],
      // duracoesDisponiveis: [
      //   { icon: "account", nome: "1-15", min: 1, max: 15, type: "is-danger" },
      //   { icon: "account", nome: "15-30", min: 15, max: 30, type: "is-danger" },
      //   { icon: "account", nome: "30-45", min: 30, max: 45, type: "is-danger" },
      //   { icon: "account", nome: "30-60", min: 30, max: 60, type: "is-danger" },
      //   {
      //     icon: "account",
      //     nome: "60-120",
      //     min: 60,
      //     max: 120,
      //     type: "is-danger",
      //   },
      //   {
      //     icon: "account",
      //     nome: "120-240",
      //     min: 120,
      //     max: 240,
      //     type: "is-danger",
      //   },
      // ],
      // tamanhosTimeDisponiveis: [
      //   {
      //     icon: "account",
      //     nome: "Individual",
      //     min: 1,
      //     max: 1,
      //     type: "is-danger",
      //   },
      //   { icon: "account", nome: "2-5", min: 2, max: 5, type: "is-danger" },
      //   { icon: "account", nome: "5-10", min: 5, max: 10, type: "is-danger" },
      //   { icon: "account", nome: "10-40", min: 10, max: 40, type: "is-danger" },
      //   { icon: "account", nome: "40+", min: 40, max: null, type: "is-danger" },
      // ],
      categoriasSelecionadas: [],
      // duracoesSelecionadas: [],
      // tamanhosTimeSelecionados: [],
      classes: [],
      tools: [],
      selectedCard: -1,
    };
  },
  methods: {
    hoverCard(selectedIndex) {
      this.selectedCard = selectedIndex;
    },
    isSelected(cardIndex) {
      return this.selectedCard === cardIndex;
    },

    clearTools: function () {
      this.tools.splice(0, this.tools.length);
    },
    getData() {
      var thisVM = this;
      // thisVM.$root.startLoading();

      thisVM.$store.commit("startLoading");
      var toolsRef = firebase.database().ref(`Tools`).orderByChild("active").equalTo(true);

      toolsRef.on("value", function (snapshot) {
        thisVM.clearTools();
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();

          if (childSnapshot.key != "_count") {
            thisVM.tools.push({
              id: childSnapshot.key,
              imageURL: childData.imageURL,
              avatar: childData.avatar,

              minTime: childData.minTime,
              maxTime: childData.maxTime,
              minTeamSize: childData.minTeamSize,
              maxTeamSize: childData.maxTeamSize,
              category: childData.category,
              name: childData.name,
              summary: childData.summary,
            });
            thisVM.minDuracaoDisponivel = Math.min(
              thisVM.minDuracaoDisponivel,
              childData.maxTime ? childData.maxTime : 1
            );
            thisVM.maxDuracaoDisponivel = Math.max(
              thisVM.maxDuracaoDisponivel,
              childData.maxTime ? childData.maxTime : 1
            );
            thisVM.minTamanhoTimeDisponivel = Math.min(
              thisVM.minTamanhoTimeDisponivel,
              childData.minTeamSize ? childData.minTeamSize : 1
            );
            thisVM.maxTamanhoTimeDisponivel = Math.max(
              thisVM.maxTamanhoTimeDisponivel,
              childData.maxTeamSize ? childData.maxTeamSize : 1
            );
          }
        });

        thisVM.duracaoSelecionada = thisVM.maxDuracaoDisponivel;
        thisVM.tamanhoTimeSelecionado = 0;
        thisVM.$store.commit("stopLoading");
        //thisVM.$root.stopLoading();
      });
    },
  },
  computed: {
    filteredTools() {
      var thisVM = this;
      var filterKey = null;

      var filteredTools = this.tools;

      if (filterKey) {
        filteredTools = filteredTools.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
      }

      if (this.categoriasSelecionadas.length > 0) {
        filteredTools = filteredTools.filter(function (tool) {
          return thisVM.categoriasSelecionadas.some(function (categoria) {
            return categoria.nome == tool.category;
          });
        });
      }

      filteredTools = filteredTools.filter(function (tool) {
        //   debugger;
        return ( 
          (tool.maxTime != null &&
            thisVM.duracaoSelecionada >=  tool.maxTime ) && (tool.minTime != null &&
            thisVM.duracaoSelecionada  >=  tool.minTime )
        );
      });

      filteredTools = filteredTools.filter(function (tool) {
        //   debugger;
        return (
          tool.maxTeamSize == null ||
          (tool.maxTeamSize != null &&
            thisVM.tamanhoTimeSelecionado <= tool.maxTeamSize)
        );
      });
 

      return filteredTools;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>