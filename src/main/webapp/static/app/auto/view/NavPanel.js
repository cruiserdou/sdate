Ext.define('App.view.NavPanel', {
    extend: 'Ext.tree.Panel',
    iconCls: 'icon_menu_tool',
    requires: [
        'Ext.tree.*',
        'Ext.data.*'
    ],
    title: '菜单',
    alias: 'widget.navPanel',
    split: true,
    rootVisible: false,
    initComponent: function () {
        this.store = 'Tree';
        this.callParent(arguments);
    }
})
