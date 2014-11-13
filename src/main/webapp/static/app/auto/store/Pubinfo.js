/**
 * Created by dou on 14-1-19.
 */
Ext.define('App.store.Pubinfo', {
    extend: 'Ext.data.Store',
    model: 'App.model.Pubinfo',
    proxy: {
        type: 'ajax',
        url: 'obtain_pub_info',
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