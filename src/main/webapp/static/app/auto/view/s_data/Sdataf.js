Ext.define('App.view.s_data.Sdataf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sdataf',
    frame: true,
    iconCls: "icon_paper_doc",
    border: false,
    layout: 'border',

    initComponent: function () {

        this.items = [
            {
                xtype: 's_data_query',
                region: 'north'
            },{
                xtype: 's_data_grid',
                region: 'center'
            }
        ]
        this.callParent(arguments);
    }
});
