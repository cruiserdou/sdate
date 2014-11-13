Ext.define('App.view.depts.Deptf', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.deptf',
    id :'deptf_id',
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
                xtype: 'deptf_query',
                region: 'north'
            },
            {
                xtype: 'deptf_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});