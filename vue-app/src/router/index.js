import Vue from 'vue'
import VueRouter from 'vue-router'
//import Dashboard from '../views/Dashboard.vue'
import firebase from 'firebase'
import { page } from 'vue-analytics'

import store from '../store/index'


import VueAnalytics from 'vue-analytics'

Vue.use(VueRouter)
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
    path: '/Feedback/Pedir',
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
      friendlyName: "Habilidades",
      breadcrumb: [
        { name: 'Feedbacks', link: 'FeedbackDashboard' },
        { name: 'Dar Feedback', link: 'Feedback' },
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/Provide-Skill-Feedback.vue')
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
  var redirectToPath = to.path;
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
    firebase.auth().onAuthStateChanged(function () {

      next();
    }
    );
    next();
  }



});


export default router