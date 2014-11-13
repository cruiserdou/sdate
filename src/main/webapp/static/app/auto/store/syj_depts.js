Ext.define('App.store.syj_depts', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_depts',
    proxy: {
        type: 'ajax',
        url: 'obtain_depts_info',
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


