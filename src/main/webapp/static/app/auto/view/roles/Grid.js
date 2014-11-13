var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.roles.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rolesf_grid',
    store: 'syj_roles',
    selModel: sm,
    id :'grid_roles',
    initComponent: function () {
        this.columns = [
            {text: '角色ID', width: 80, dataIndex: 'id' ,hidden:true},
            {text: '角色名称', width: 120, dataIndex: 'rolename' },
            {text: '角色描述', width: 800, dataIndex: 'roledesc'},
            {text: '备注',  flex: 1, dataIndex: 'remark'}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_roles',
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