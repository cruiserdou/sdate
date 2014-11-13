
Ext.define('App.store.syj_userroles', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_userroles',
    proxy: {
        type: 'ajax',
        url: 'obtain_userroles_info',
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


