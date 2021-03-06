import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/Building',
      name: 'Building',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Buildings/Building.vue')
    },
    {
      path: '/Buildings',
      name: 'Buildings',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Buildings/Buildings.vue')
    },
    {
      path: '/Issues',
      name: 'Accidents',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Issues.vue')
    },

    {
      path: '/Issues/Accidents/Accident:id/',
      name: 'Accident',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Accidents/Accident.vue')
    },

    {
      path: '/NewBuilding',
      name: 'NewBuilding',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Buildings/NewBuilding.vue')
    },
    {
      path: '/Issues/Groups/',
      name: 'Groups',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Tasks/Groups.vue')
    },
    {
      path: '/Issues/Groups/Group:id/',
      name: 'Group',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Tasks/Group.vue')
    },
    {
      path: '/Issues/NewAccident',
      name: 'NewAccident',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Accidents/NewAccident.vue')
    },
    {
      path: '/Issues/OpenAccidents',
      name: 'OpenAccidents',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Accidents/OpenedAccidents.vue')
    },
    {
      path: '/Issues/Reports',
      name: 'Reports',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Reports/Report.vue')
    },

    {
      path: '/Issues/Inventory',
      name: 'Inventory',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Inventory/Inventory.vue')
    },

    {
      path: '/Issues/Tasks/HVAC',
      name: 'HVAC',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Tasks/HVAC/HVAC.vue')
    },

    {
      path: '/Notifications',
      name: 'Notifications',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Notifications.vue')
    },

    {
      path: '/Test',
      name: 'Test',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Test.vue')
    },

    {
      path: '/Issues/Tasks/NewTask',
      name: 'NewTask',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Tasks/NewTask.vue')
    },
    {
      path: '/Issues/Tasks/NewGroup',
      name: 'NewGroup',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Tasks/NewGroup.vue')
    },
    {
      path: '/Issues/Vendors/',
      name: 'Vendors',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Vendors/Vendors.vue')
    },
    {
      path: '/',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Login.vue')
    },

    {
      path: '/Issues/Users',
      name: 'Users',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Users/Users.vue')
    },

    {
      path: '/Issues/Autorizations',
      name: 'Autorizations',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Autorizations/Autorizations.vue')
    },
    {
      path: '/Issues/Autorizations/Roles',
      name: 'Roles',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Autorizations/Roles/Roles.vue')
    },
    {
      path: '/Issues/Autorizations/Permissions',
      name: 'Permissions',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Autorizations/Permissions/Permissions.vue')
    },
    {
      path: '/Issues/Autorizations/Roles/NewRole',
      name: 'NewRole',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Autorizations/Roles/NewRole.vue')
    },
    {
      path: '/Issues/Autorizations/Roles/Role/',
      name: 'Role',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Autorizations/Roles/Role.vue')
    },
    {
      path: '/Issues/Autorizations/Roles/RoleSingle/:id/',
      name: 'RoleSingle',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Autorizations/Roles/RoleSingle.vue')
    },
    {
      path: '/Issues/Inventory/ItemMasterData',
      name: 'ItemsMasterData',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Inventory/ItemMasterData.vue')
    },
    {
      path: '/Issues/Inventory/WareHouses',
      name: 'WareHouses',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Inventory/WareHouse.vue')
    },
    {
      path: '/Issues/Reports/WhsJournal',
      name: 'WhsJournal',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Reports/WhsJournal.vue')
    },
    {
      path: '/Issues/Inventory/GoodsIssue',
      name: 'GoodsIssue',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Inventory/GoodsIssue.vue')
    },
    {
      path: '/Issues/Inventory/GoodsReciept',
      name: 'GoodsReciept',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Inventory/GoodsReceipt.vue')
    },
    {
      path: '/Issues/Inventory/GoodsIssueRequest',
      name: 'GoodsIssueRequest',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Inventory/GoodsIssueRequest.vue')
    },
    {
      path: '/Issues/PlannedWorks/AddPlannedWorks',
      name: 'AddPlannedWork',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/PlannedWorks/AddPlannedWork')
    },
    {
      path: '/Issues/PlannedWorks/PlannedWork:id/',
      name: 'PlannedWork',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/PlannedWorks/PlannedWork')
    },
    {
      path: '/Issues/PlannedWorks',
      name: 'PlannedWorks',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/PlannedWorks/PlannedWorks.vue')
    },
    {
      path: '/Issues/Reports/StockReport',
      name: 'StockReport',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Reports/StockReport.vue')
    },
    {
      path: '/Issues/Reports/AccidentReport',
      name: 'AccidentReport',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Reports/AccidentReport.vue')
    },
    {
      path: '/Issues/Reports/TasksReport',
      name: 'TasksReport',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Reports/TasksReport.vue')
    },
    {
      path: '/Others',
      name: 'Others',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Others.vue')
    },
    {
      path: '/Issues/Inventory/ResetTransactions',
      name: 'ResetTransactions',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './components/Issues/Inventory/ResetStock.vue')
    }
  ]
})
 