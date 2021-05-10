import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import Tutorials from './views/Tutorials.vue';
import Home from './views/Home.vue';
import NewTutorial from './views/NewTutorial.vue';
import TutorialPage from './views/TutorialPage.vue';
// import Edit from './views/Edit.vue';
import Login from './views/Login.vue';
//import TutDesc from './components/TutDesc.vue';
import Register from './views/Register.vue';
import EarnCoins from './views/EarnCoins.vue';
import UserPage from './views/UserPage.vue';
import Meeting from './components/meeting/Meeting.vue';
import IsTutIsStud from './views/Entwurf/IsTutIsStud.vue';
import NotTutIsStud from './views/Entwurf/NotTutIsStud.vue';
import IsTutNotStud from './views/Entwurf/IsTutNotStud.vue';
import NotTutNotStud from './views/Entwurf/NotTutNotStud.vue';
import Forgot from './components/auth/Forgot.vue';
import Reset from './components/auth/Reset.vue';
import Explore from './views/Explore.vue';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      alias: '/home',
      component: Home,
      metaInfo: {
        title: 'NKA - Home'
      }
    },
    {
      path: '/tutorials',
      name: 'tutorials',
      component: Tutorials,
      metaInfo: {
        title: 'NKA - Tutorials'
      }
    },
    {
      path: '/explore-tutorials',
      name: 'explore-tutorials',
      component: Explore,
      metaInfo: {
        title: 'NKA - Explore'
      }
    },
    {
      path: '/meeting',
      name: '/meeting',
      component: Meeting
    },
    {
      path: '/users/:id',
      name: 'user-page',
      component: UserPage
    },
    {
      path: '/tutorials/new',
      name: 'new-tutorial',
      component: NewTutorial
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/login/forgot',
      name: 'forgot',
      component: Forgot
    },
    {
      path: '/reset/:token',
      name: 'Reset Your Password',
      component: Reset,
      meta: {
        auth: true,
        title: 'NKA: Reset Your Password'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/earn-coins',
      name: 'earn-coins',
      component: EarnCoins
    },
    {
      path: '/socialIsTutorIsStud',
      name: 'socialIsTutorIsStud',
      component: IsTutIsStud
    },
    {
      path: '/socialNotTutorIsStud',
      name: 'socialNotTutorIsStud',
      component: NotTutIsStud
    },
    {
      path: '/socialNotTutorNotStud',
      name: 'socialNotTutorNotStud',
      component: NotTutNotStud
    },
    {
      path: '/socialIsTutorNotStud',
      name: 'socialIsTutorNotStud',
      component: IsTutNotStud
    },
    {
      path: '/tutorials/:id/:page',
      name: 'tutorial-page',
      component: TutorialPage
    },
    // {
    //   path: '/tutorials/:id/edit',
    //   name: 'edit',
    //   component: Edit
    // }

  ]
});