Ext.define('App.view.home_page.pub_mgr.Pubmgr', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.pubmgr',
    iconCls: "icon_anay",
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
                xtype: 'pubmgr_query',
                region: 'north'
            },
            {
                xtype: 'pubmgr_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});


