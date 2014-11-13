Ext.define('App.store.syj_menu', {
        extend: 'Ext.data.Store',
        model: 'App.model.syj_menu',
        proxy: {
            type: 'ajax',
            url: 'obtain_menu_info',
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

