Ext.define('App.view.menu.Policef', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.policef',
    layout: 'border',
    id:'policef_id',
    iconCls: 'icon_paper_doc',
    initComponent: function () {

        this.items = [
            {
                xtype: 'police_query',
                region: 'north'
            },
            {
                xtype: 'police_grid',
                region: 'center'
            }
        ];
        this.callParent(arguments);
    }
});