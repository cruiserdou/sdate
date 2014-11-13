Ext.define('App.store.syj_dicts', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_dicts',
    proxy: {
        type: 'ajax',
        url: 'obtain_dicts_info',
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


