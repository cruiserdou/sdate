Ext.define('App.store.syj_rolepermissions', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_rolepermissions',
    proxy: {
        type: 'ajax',
        url: 'obtain_rolepermissions_info',
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



