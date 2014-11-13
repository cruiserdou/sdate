Ext.define('App.store.syj_users', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_users',
    proxy: {
        type: 'ajax',
        url: 'obtain_users_info',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    autoLoad: true
});





