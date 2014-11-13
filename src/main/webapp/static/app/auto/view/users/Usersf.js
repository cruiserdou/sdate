Ext.define('App.view.users.Usersf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.usersf',
    "iconCls": "icon_person",
    layout: 'border',
    border: false,
    initComponent: function () {
        this.items = [
            {
                xtype: 'usersf_query',
                region: 'north'
            },
            {
                xtype: 'usersf_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});