/**
 * Created by dou on 14-1-19.
 */
Ext.define('App.store.s_data', {
    extend: 'Ext.data.Store',
    model: 'App.model.s_data',
    proxy: {
        type: 'ajax',
        url: 'obtain_s_data_info',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    autoLoad: false
});



