Ext.define('App.controller.Tabitem', {
    extend: 'Ext.app.Controller',

    stores: [
        'syj_depts','syj_users','syj_menu','Dept_store',
        'syj_roles','syj_userroles','syj_rolepermissions',
         'Pubinfo',
        'cust_info',
//        'cust_info_suspend',
        's_data'
    ],

    models: [
        'syj_depts','syj_users','syj_menu','Dept_store','syj_dicts',
        'syj_roles','syj_userroles','syj_rolepermissions', 'Pubinfo'
        ,'cust_info','cust_info_suspend','s_data'],

    views: [
        'home_page.public_info.Pubinfof', 'home_page.public_info.Query',
        'home_page.pub_mgr.Pubmgr','home_page.pub_mgr.Grid', 'home_page.pub_mgr.Query',
        'depts.Deptf', 'depts.Grid', 'depts.Query',
        'dicts.Dictsf', 'dicts.Grid', 'dicts.Query',
        'roles.Rolesf', 'roles.Query', 'roles.Grid',
        'users.Usersf','users.Query', 'users.Grid',
        'userroles.Userrolesf', 'userroles.Query', 'userroles.Grid',
        'menu.Policef', 'menu.Grid', 'menu.Query',
        'rolepermissions.Truckoutf', 'rolepermissions.Grid', 'rolepermissions.Query',
        'analog.Analogf','analog.Cust_Grid','analog.Query',
        's_data.Sdataf','s_data.Grid','s_data.Query'
  ],

    refs: [
        {
            ref: 'panel',
            selector: 'detailPanel'
        },
        {
            ref: 'paneldata',
            selector: 'datacir_detailPanel'
        }
    ]
});
