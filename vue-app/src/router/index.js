import Vue from 'vue'
import VueRouter from 'vue-router'
//import Dashboard from '../views/Dashboard.vue'
import firebase from 'firebase'
import { page } from 'vue-analytics'

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
    path: '/Home',
    name: 'Home',
    meta: {},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/PedirFeedback/Habilidade',
    name: 'SkillFeedback',
    meta: {
      requiresAuth: true,

      friendlyName: "Habilidades",
      breadcrumb: [
        { name: 'Feedbacks', link: 'FeedbackDashboard' },
        { name: 'Pedir Feedback', link: 'Feedback' },
      ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Feedback/Skill-Feedback.vue')
  },
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

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