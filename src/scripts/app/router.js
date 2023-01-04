import Vue from 'vue'
import Router from 'vue-router'
// import index from '../../views/index.vue'
import overview from '../../views/overview.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      meta:{
        title: 'Check your investment'
      },
      path: '/',
      name: 'index',
      component: overview
    },
    {
      path: '/about',
      name: 'about',
      meta:{
        title: 'Check your investment'
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/About.vue')
    },
    {
      path: '/overview',
      name: 'overview',
      component: overview,
      props: true
    }
  ]
});

const DEFAULT_TITLE = 'Check your investment';
// eslint-disable-next-line
router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
