/**
 * Created by jj on 14-6-19.
 */
Ext.define('App.store.syj_roles', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_roles',
    proxy: {
        type: 'ajax',
        url: 'obtain_roles_info',
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


