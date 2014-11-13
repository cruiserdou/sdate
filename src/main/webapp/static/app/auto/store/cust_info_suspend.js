/**
 * Created by dou on 14-1-19.
 */
Ext.define('App.store.cust_info_suspend', {
    extend: 'Ext.data.Store',
    model: 'App.model.cust_info_suspend',
    proxy: {
        type: 'ajax',
        url: 'obtain_cust_suspend_info',
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
 

