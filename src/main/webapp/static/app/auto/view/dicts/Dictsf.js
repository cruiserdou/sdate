Ext.define('App.view.dicts.Dictsf', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.dictsf',
    "iconCls": "icon_edit_find_replace",
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            region: 'center'
        }
    ],
    initComponent: function () {
        this.items = [
            {
                xtype: 'dictsf_query',
                region: 'north'
            },
            {
                xtype: 'dictsf_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});