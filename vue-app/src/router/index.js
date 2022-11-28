import Vue from 'vue'
import VueRouter from 'vue-router'
//import Dashboard from '../views/Dashboard.vue'
import firebase from 'firebase'
import { page } from 'vue-analytics'

import Meta from 'vue-meta'

import store from '../store/index'


import VueAnalytics from 'vue-analytics'

Vue.use(VueRouter)
Vue.use(Meta
  //   , {
  //   keyName: 'metaInfo',
  //   attribute: 'data-vue-meta',
  //   ssrAttribute: 'data-vue-meta-server-rendered',
  //   tagIDKeyName: 'vmid',
  //   refreshOnceOnNavigation: true
  // }
)

const routes = [
  // {
  //   path: '/',
  //   name: 'Dashboard',
  //   component: Dashboard,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/logoff',
    name: 'Logoff',
    component: () => import( /* webpackChunkName: "login" */ '../views/Logoff.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import( /* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/Home'
  },
  {
    path: '/Sobre',
    name: 'Sobre',
    meta: {},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Privacidade',
    name: 'Privacidade',
    meta: {},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Privacidade.vue')
  },
  {
    path: '/Nossos-Experts',
    name: 'Experts',
    meta: {},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Experts.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    meta: {},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },

  {
    path: '/Feedback/Pedir/:IdTemplate?',
    name: 'SkillFeedback',
    meta: {
      requiresAuth: true,

      friendlyName: "Pedir Feedback",
      breadcrumb: [
        { name: 'Feedbacks', link: 'FeedbackDashboard' },
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/FeedbackRequest.vue')
  },

  // {
  //   path: '/PedirFeedback/Habilidade',
  //   name: 'SkillFeedback',
  //   meta: {
  //     requiresAuth: true,

  //     friendlyName: "Pedir Feedback",
  //     breadcrumb: [
  //       { name: 'Feedbacks', link: 'FeedbackDashboard' },
  //     ]
  //   },
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/Skill-Feedback.vue')
  // },
  {
    path: '/PedirFeedback/',
    name: 'Feedback',
    meta: {
      requiresAuth: true,
      friendlyName: "Pedir Feedback",
      breadcrumb: [
        { name: 'Feedbacks', link: 'FeedbackDashboard' },
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/Request.vue')
  },
  {
    path: '/DarFeedback/:IdfeedBackRequest',
    name: 'ProvideSkillFeedback',
    meta: {

      requiresAuth: true,
      friendlyName: "Dar Feedback",
      breadcrumb: [
        { name: 'Feedbacks', link: 'FeedbackDashboard' },
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/Provide-Skill-Feedback.vue')
  },
  {
    path: '/VerFeedback/:IdFeedbackRequest/:IdFeedbackResponse',
    name: 'VerFeedback',
    meta: {

      requiresAuth: true,
      friendlyName: "Ver Feedback",
      breadcrumb: [
        { name: 'Feedbacks', link: 'FeedbackDashboard' },
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/VerFeedback.vue')
  }, {
    path: '/Dashboard/Feedbacks',
    name: 'FeedbackDashboard',
    meta: {

      requiresAuth: true,
      friendlyName: "Feedbacks"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/Dashboard.vue')
  },
  {
    path: '/MeuPerfil',
    name: 'MeuPerfil',
    meta: {

      requiresAuth: true,
      friendlyName: "Meu Perfil"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Perfil/MeuPerfil.vue')
  },
  {
    path: '/MeuPerfil/Futuro',
    name: 'MeuPerfilFuturo',
    meta: {

      requiresAuth: true,
      friendlyName: "Futuro",
      breadcrumb: [
        { name: 'Meu Perfil', link: 'MeuPerfil' }
      ]
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Perfil/MapaFuturo.vue')
  },
  {
    path: '/Iniciativa/Nova',
    name: 'NovaIniciativa',
    meta: {

      requiresAuth: true,
      friendlyName: "Nova",
      breadcrumb: [
        { name: 'Iniciativas', link: 'InitiativeDashboard' }
      ]
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Iniciativas/NovoConvite.vue')
  }, {
    path: '/Dashboard/Iniciativas',
    name: 'InitiativeDashboard',
    meta: {

      requiresAuth: true,
      friendlyName: "Iniciativas"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Iniciativas/Dashboard.vue')
  },
  {
    path: '/Iniciativas/Ver/:IdInitiative',
    name: 'InitiativeDetail',
    meta: {

      requiresAuth: false,
      friendlyName: "Ver Iniciativa",
      breadcrumb: [
        { name: 'Iniciativas', link: 'InitiativeDashboard' }
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Iniciativas/Details.vue')
  },
  {
    path: '/Iniciativas/Suportar/:IdInitiative',
    name: 'SupportInitiative',
    meta: {

      requiresAuth: true,
      friendlyName: "Suportar Iniciativa",
      breadcrumb: [
        { name: 'Iniciativas', link: 'InitiativeDashboard' }
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Iniciativas/Suportar.vue')
  },
  {
    path: '/Contato',
    name: 'Contato',
    meta: {

      requiresAuth: false,
      friendlyName: "Contato"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Contato.vue')
  },
  {
    path: '/Notificacoes',
    name: 'Notificacoes',
    meta: {

      requiresAuth: true,
      friendlyName: "Notificações"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Notificacoes.vue')
  },

  {
    path: '/OKRs/MeusOKRs',
    name: 'MeusOKRs',
    meta: {

      requiresAuth: true,
      friendlyName: "Meus OKRs"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OKRs/MeusOKRs.vue')
  },
  {
    path: '/ArvoreConhecimento',
    name: 'ArvoreConhecimento',
    meta: {

      requiresAuth: true,
      friendlyName: "Árvore do Conhecimento"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/KnowledgeTree/ArvoreConhecimento.vue')
  },
  {
    path: '/EditorPaginas/:IdPage?',
    name: 'EditorPaginas',
    meta: {

      requiresAuth: true,
      friendlyName: "Editor de Páginas"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Paginas/PageCreator.vue')
  },
  {
    path: '/Conteudo/:IdPage/:permalink?',
    name: 'PageContent',
    meta: {

      requiresAuth: false,
      friendlyName: "Conteúdo",

      breadcrumb: [
        { name: 'Árvore do Conhecimento', link: 'ArvoreConhecimento' }
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Paginas/PageDisplayer.vue')
  },
  {
    path: '/Quiz/Responder/:IdQuiz',
    name: 'Quiz',
    meta: {

      requiresAuth: false,
      friendlyName: "Responder Quiz",

      // breadcrumb: [
      //   { name: 'Árvore do Conhecimento', link: 'ArvoreConhecimento' }
      // ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Quiz/Quiz.vue')
  }, {
    path: '/Quiz/Criar/:IdQuiz?',
    name: 'CreateQuiz',
    meta: {

      requiresAuth: false,
      friendlyName: "Criar Quiz",

      breadcrumb: [
        { name: 'Árvore do Conhecimento', link: 'ArvoreConhecimento' }
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Quiz/QuizCreator.vue')
  }, {
    path: '/Entrevistas/CriarAgenda',
    name: 'CriarAgenda',
    meta: {

      requiresAuth: true,
      friendlyName: "Criar Agenda de Entrevista",

      breadcrumb: [
        { name: 'Entrevistas', link: 'Entrevistas' }
      ]
    }, component: () => import(/* webpackChunkName: "about" */ '../views/Entrevistas/CriarAgenda.vue')
  }, {
    path: '/Entrevistas/Demandas',
    name: 'DemandasEntrevistas',
    meta: {

      requiresAuth: true,
      friendlyName: "Demandas de Entrevistas",

      breadcrumb: [
        { name: 'Entrevistas', link: 'Entrevistas' }
      ]
    }, component: () => import(/* webpackChunkName: "about" */ '../views/Entrevistas/Demandas.vue')
  }, {
    path: '/Entrevistas/Solicitar/:InviterCode?',
    name: 'AgendarEntrevista',
    meta: {

      requiresAuth: false,
      friendlyName: "Agendar Entrevista",

      // breadcrumb: [
      //   { name: 'Entrevistas', link: 'Entrevistas' }
      // ]
    }, component: () => import(/* webpackChunkName: "about" */ '../views/Entrevistas/Agendar.vue')
  }, {
    path: '/Feedback/TesteEmpregabilidade',
    name: 'FeedbackTesteEmpregabilidade',
    meta: {

      requiresAuth: false,
      friendlyName: "O que achou do papo?",

      // breadcrumb: [
      //   { name: 'Entrevistas', link: 'Entrevistas' }
      // ]
    }, component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/Feedback-TesteEmpregabilidade.vue')
  }, {
    path: '/Feedback/EventoAteOFuturo/:IdEvento?',
    name: 'FeedbackDesignThinkingFuturo',
    meta: {

      requiresAuth: false,
      friendlyName: "O que achou do papo?",

      // breadcrumb: [
      //   { name: 'Entrevistas', link: 'Entrevistas' }
      // ]
    }, component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/Feedback-DesignThinkingFuturo.vue')
  }, {
    path: '/Entrevistas/MarcarSessao',
    name: 'MarcarSessao',
    meta: {

      requiresAuth: false,
      friendlyName: "Marcar Sessão",

      // breadcrumb: [
      //   { name: 'Entrevistas', link: 'Entrevistas' }
      // ]
    }, component: () => import(/* webpackChunkName: "about" */ '../views/Entrevistas/MarcarSessao.vue')
  },

  {
    path: '/FeedFuture/Pedir/:IdFeedFuture?',
    name: 'FeedFuturePedir',
    meta: {
      requiresAuth: true,

      friendlyName: "Pedir Feedback",
      breadcrumb: [
        { name: 'Feedbacks', link: 'FeedbackDashboard' },
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/FeedFuture-Pedir.vue')
  },
  {
    path: '/FeedFuture/Modelos',
    name: 'FeedFutureModelos',
    meta: {
      requiresAuth: true,

      friendlyName: "Modelos de Pedido de Feedback",
      breadcrumb: [
        { name: 'Feedbacks', link: 'FeedbackDashboard' },
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/FeedFuture-Modelos.vue')
  },
  {
    path: '/FeedFuture/Criar/:IdFeedFuture?',
    name: 'FeedFutureCriar',
    meta: {
      requiresAuth: true,

      friendlyName: "Criar Modelo de Pedido de Feedback",
      breadcrumb: [
        { name: 'Feedbacks', link: 'FeedbackDashboard' },
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/FeedFuture-Criar.vue')
  },

  {
    path: '/Certificados/Validar/:CertificateId?',
    name: 'ValidaCertificado',
    meta: {
      requiresAuth: false,

      friendlyName: "Validar Autenticidade do Certificado",
      // breadcrumb: [
      //   { name: 'Certificados', link: 'ValidaCertificado' },
      // ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Certificados/ValidaCertificado.vue')
  },

  {
    path: '/Certificados/Emitir',
    name: 'EmitirCertificado',
    meta: {
      requiresAuth: false,

      friendlyName: "Emitir Certificado",
      // breadcrumb: [
      //   { name: 'Certificados', link: 'ValidaCertificado' },
      // ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Certificados/EmitirCertificado.vue')
  },
  {
    path: '/Obrigado',
    name: 'ObrigadoCompra',
    meta: {
      requiresAuth: false,

      friendlyName: "Obrigado pela confiança!",

    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Obrigado-Compra.vue')
  },
  {
    path: '/Users/Management',
    name: 'ManageUsers',
    meta: {
      requiresAuth: true,

      friendlyName: "Gestão de Usuarios",

    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios/ListaUsuarios.vue')
  }, {
    path: '/Comprar',
    name: 'Comprar',
    meta: {
      requiresAuth: true,

      friendlyName: "Comprar",

    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Comprar/CompraCredito.vue')
  }, {
    path: '/Sala/:RoomId',
    name: 'Sala',
    meta: {
      requiresAuth: true,

      friendlyName: "Sala",

    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Salas/Sala.vue')
  }, {
    path: '/Ferramentas',
    name: 'Ferramentas',
    meta: {
      requiresAuth: false,

      friendlyName: "Caixa de Ferramentas do Futuro",

    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Toolbox/Toolbox.vue')
  }, {
    path: '/Toolbox',
    name: 'Toolbox',
    meta: {
      requiresAuth: false,

      friendlyName: "Caixa de Ferramentas do Futuro",

    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Toolbox/Toolbox.vue')
  }, {
    path: '/Toolbox/:toolId',
    name: 'ToolDetail',
    meta: {
      requiresAuth: false,

      friendlyName: "Detalhe da Ferramenta",
      breadcrumb: [{ name: 'Caixa de Ferramentas', link: 'Toolbox' },
      ]
    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Toolbox/ToolDetail.vue')
  }, {
    path: '/Toolbox/Suportar/:toolId',
    name: 'SupportTool',
    meta: {
      requiresAuth: true,

      friendlyName: "Suportar Ferramenta",
      breadcrumb: [{ name: 'Caixa de Ferramentas', link: 'Toolbox' },
      ]
    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Toolbox/SuportTool.vue')
  }, {
    path: '/Criatividade/Inventiva',
    name: 'CriatividadeInventiva',
    meta: {
      requiresAuth: false,

      friendlyName: "Criatividade: Pensamento Inventivo",
      breadcrumb: [{ name: 'Criatividade', link: 'Criatividade' },
      ]
    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/criatividade-inventiva/Inventiva.vue')
  },

  {
    path: '/labs/unconference/public/:unconferenceId',
    name: 'public-unconference',
    meta: {
      requiresAuth: false,

      friendlyName: "sennder: Concept",

    },
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/labs/unconference.vue')
  },
  {
   path: '/labs/unconference/:unconferenceId',
   name: 'unconference',
   meta: {
     requiresAuth: true,

     friendlyName: "sennder: Concept",

   },
   // which is lazy-loaded when the route is visited.
   component: () => import(/* webpackChunkName: "about" */ '../views/labs/unconference.vue')
 },
 {
  path: '/labs/skills-comparer/:contextId',
  name: 'skills-comparer',
  meta: {
    requiresAuth: true,

    friendlyName: "skills-comparer: Concept",

  },
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/labs/skill-comparer.vue')
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
  ,
  scrollBehavior() {
    return { x: 0, y: 0 };

  }
});

if (process.env.NODE_ENV === "production") {
  Vue.use(VueAnalytics, {
    id: 'G-96NDFQ3TWZ', router
  })
}

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  document.title = "Até o Futuro! "; // Este é o Title /Título Padrão Defaul para páginas que não usam o vue-Headful
  // montando querystring se necessario 
  var qString = "";
  if (to.query != null && to.query != undefined)
    var str = [];
  for (var p in to.query) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(to.query[p]));
  }
  qString = str.join("&");

  if (qString != "") { qString = "?" + qString; }

  var redirectToPath = to.path + qString;
  if (router.currentRoute.query.redirectToPath != null) {
    // redirectToPath = router.currentRoute.query.redirectToPath;
  }

  page(to.path)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(
      function (user) {


        store.commit("setCurrentUser", user);
        //   this.$root.sharedUserState.state.setCurrentUser(user);
        if (!user) {
          next({
            path: '/login'
            , query: { redirectToPath: redirectToPath }
          })
        } else {
          next()
        }
      });
  } else {
    firebase.auth().onAuthStateChanged(
      function (user) {


        store.commit("setCurrentUser", user);
        //   this.$root.sharedUserState.state.setCurrentUser(user);

        // firebase.auth().onAuthStateChanged(function () {

        //   next();
        // }
        // );
        next();
      });
  }



});


export default router