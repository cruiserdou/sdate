/**
 * Created by dou on 14-1-19.
 */
Ext.define('App.store.cust_info', {
    extend: 'Ext.data.Store',
    model: 'App.model.cust_info',
    proxy: {
        type: 'ajax',
        url: 'obtain_cust_info',
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


