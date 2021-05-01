import Vue from 'vue';
import Router from 'vue-router';
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

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      alias: '/home',
      component: Home
    },
    {
      path: '/tutorials',
      name: 'tutorials',
      component: Tutorials
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