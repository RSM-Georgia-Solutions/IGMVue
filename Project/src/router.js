import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Building',
      name: 'Building',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Buildings/Building.vue')
    },
    {
      path: '/Buildings',
      name: 'Buildings',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Buildings/Buildings.vue')
    },
    {
      path: '/Issues',
      name: 'Accidents',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Issues.vue')
    },

    {
      path: '/Issues/Accidents/Accident',
      name: 'Accident',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Accidents/Accident.vue')
    },

    {
      path: '/NewBuilding',
      name: 'NewBuilding',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Buildings/NewBuilding.vue')
    },
    {
      path: '/Issues/Tasks',
      name: 'Tasks',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Tasks/Tasks.vue')
    },
    {
      path: '/Issues/NewAccident',
      name: 'NewAccident',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Accidents/NewAccident.vue')
    },
    {
      path: '/Issues/OpenAccidents',
      name: 'OpenAccidents',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Accidents/OpenedAccidents.vue')
    },
    {
      path: '/Issues/PlannedWorks',
      name: 'PlannedWorks',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/PlannedWorks/PlanedWorks.vue')
    },
    {
      path: '/Issues/Report',
      name: 'Report',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Reports/Report.vue')
    },

    {
      path: '/Issues/Inventory',
      name: 'Inventory',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Inventory/Inventory.vue')
    },

    {
      path: '/Issues/Tasks/HVAC',
      name: 'HVAC',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Tasks/HVAC/HVAC.vue')
    },

    {
      path: '/Notifications',
      name: 'Notifications',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Notifications.vue')
    },

    {
      path: '/Test',
      name: 'Test',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Test.vue')
    },

    {
      path: '/Issues/Tasks/New',
      name: 'NewTask',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Tasks/NewTask.vue')
    },
    {
      path: '/Issues/Inventory/InventoryItems',
      name: 'InventoryItems',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Inventory/InventoryItems.vue')
    },
    {
      path: '/Issues/Vendors/',
      name: 'Vendors',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Vendors/Vendors.vue')
    },
    {
      path: '/',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Login.vue')
    },

    {
      path: '/Issues/Users',
      name: 'Users',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Users/Users.vue')
    },

    {
      path: '/Issues/Autorizations',
      name: 'Autorizations',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Autorizations/Autorizations.vue')
    },
    {
      path: '/Issues/Autorizations/Roles',
      name: 'Roles',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Autorizations/Roles/Roles.vue')
    },
    {
      path: '/Issues/Autorizations/Permissions',
      name: 'Permissions',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Autorizations/Permissions/Permissions.vue')
    },
    {
      path: '/Issues/Autorizations/Roles/NewRole',
      name: 'NewRole',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Autorizations/Roles/NewRole.vue')
    },
    {
      path: '/Issues/Autorizations/Roles/Role/:id/',
      name: 'Role',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Issues/Autorizations/Roles/Role.vue')
    }
  ]
})
