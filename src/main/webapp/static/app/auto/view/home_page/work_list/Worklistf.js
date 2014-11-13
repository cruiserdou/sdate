Ext.define('App.view.home_page.work_list.Worklistf', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.work_list',
    border: false,
    iconCls: "icon_paper_doc",
    layout: 'border',
    initComponent: function () {
        this.items = [
            {
                autoScroll: true,
                region: 'center',
                xtype: 'work_list_c',
                title: '当前工作'
            },{
                region: 'center',
                xtype: 'worklisthisf',
                title: '我的工作记录'
            }
        ];
        this.callParent(arguments);
    }
});
