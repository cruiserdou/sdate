/**
 * Created by jj on 14-5-10.
 */
Ext.define('App.store.type_dict_store', {
    extend: 'Ext.data.Store',
    model: 'App.model.syj_dicts',
    proxy: {
        type: 'ajax',
        url: 'type_dict_info',
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




