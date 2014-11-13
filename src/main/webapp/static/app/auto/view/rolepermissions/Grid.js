var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.rolepermissions.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.truckuse_grid',
    store: 'syj_rolepermissions',
    selModel: sm,
    id :'grid_rolepermissions',
    initComponent: function () {
        this.store = 'syj_rolepermissions';

        this.columns = [
            {text: "角色ID", width: 105, dataIndex: 'roleid',hidden:true},
            {text: "菜单ID", width: 290, dataIndex: 'treeid',hidden:true},
            {text: "角色名称", width: 300, dataIndex: 'rolename', sortable: true},
            {text: "菜单标题", flex: 1, dataIndex: 'text', sortable: true},
            {text: "父菜单ID",  flex: 1, dataIndex: 'parentid',hidden:true}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            columnLines: true,
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_rolepermissions',
                displayInfo: true,
                displayMsg: '第 {0} 至 {1} 条，共 {2}条',
                emptyMsg: '无数据显示'
            })
        });

        this.callParent(arguments);
    }
});