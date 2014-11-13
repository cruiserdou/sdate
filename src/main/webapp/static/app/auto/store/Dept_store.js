/**
 * Created by jj on 14-5-10.
 */
Ext.define('App.store.Dept_store', {
    extend: 'Ext.data.Store',
    model: 'App.model.Dept_store',
    proxy: {
        type: 'ajax',
        url: 'obtain_depart_store',
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


