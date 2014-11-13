Ext.define('App.view.rolepermissions.Truckoutf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.truckoutf',
    border: false,
    "iconCls": "icon_paper_doc",
    layout: 'border',
    initComponent: function () {
        this.items = [
            {
                xtype: 'truckuse_query',
                region: 'north'
            },
            {
                xtype: 'truckuse_grid',
                region: 'center'
            }
        ],
            this.callParent(arguments);
    }
});