Ext.define('App.view.analog.Analogf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.analogf',
    frame: true,
    iconCls: "icon_paper_doc",
    border: false,
    layout: 'border',

    initComponent: function () {

        this.items = [
            {
                xtype: 'analog_query',
                region: 'north'
            },{
                xtype: 'cust_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});
