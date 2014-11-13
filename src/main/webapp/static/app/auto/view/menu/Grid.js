var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.menu.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.police_grid',
    store: 'syj_menu',
    selModel: sm,
    id :'grid_menu',
    initComponent: function () {
        this.columns = [
            {text: '菜单ID', width: 100, dataIndex: 'id', sortable: true},
            {text: '菜单标题', width: 120, dataIndex: 'text'},
            {text: '是否叶子', width: 100, dataIndex: 'leaf'},
            {text: '菜单父ID', width: 120, dataIndex: 'parent_id'},
            {text: '菜单链接地址', width: 300, dataIndex: 'itype'},
            {text: '图标', width: 100, dataIndex: 'iconcls'},
            {text: '根（元）', width: 100, dataIndex: 'root'},
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_menu',
                displayInfo: true,
                displayMsg: '第 {0} 到 {1} 条数据, 共{2}条',
                emptyMsg: '无数据'
            }),
            columnLines: true,
            enableLocking: true
        });

        this.callParent(arguments);
    }
});
