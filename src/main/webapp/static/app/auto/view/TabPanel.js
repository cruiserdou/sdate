Ext.define('App.view.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabPanel',
    border: false,
    id: 'tabPanel_id',
    initComponent: function () {
        this.callParent(arguments);
    }
})