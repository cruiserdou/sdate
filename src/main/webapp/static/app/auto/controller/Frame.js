Ext.define('App.controller.Frame', {
    extend: 'Ext.app.Controller',

    stores: ['Tree'],

    models: ['Tree'],

    views: ['NavPanel', 'TabPanel'],

    refs: [
        {
            ref: 'navPanel',
            selector: 'navPanel'
        },
        {
            ref: 'tabPanel',
            selector: 'tabPanel'
        }
    ],

    init: function () {
        this.control({
            'navPanel': {
                itemclick: function (view, rec, item, index, e) {
                    var itemid = rec.get('itype') + '_id';
                    var tabitem = Ext.getCmp(itemid);
                    if (!tabitem && rec.get('itype') != "no") {
                        tabitem = Ext.getCmp('tabPanel_id').add({
                            xtype: rec.get('itype'),
                            id: itemid,
                            title: rec.get('text'),
                            closable: true
                        });
                    }
                    Ext.getCmp('tabPanel_id').setActiveTab(tabitem);
                },
                afterrender: function () {
                    Ext.getCmp('tabPanel_id').add({
                        xtype: 'policef',
                        id: 'policef_id',
                        title: '菜单'
                    })
                }
            }
        })
    }
});

