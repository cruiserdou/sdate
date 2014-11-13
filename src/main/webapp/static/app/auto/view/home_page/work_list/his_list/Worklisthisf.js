Ext.define('App.view.home_page.work_list.his_list.Worklisthisf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.worklisthisf',
    iconCls: "icon_his",
    layout: 'border',
    border: false,
    items: [
        {
            xtype: 'panel',
            region: 'center'
        }
    ],
    initComponent: function () {
        this.items = [
            {
                xtype: 'work_list_his_query',
                region: 'north'
            },
            {
                xtype: 'work_list_his_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});

