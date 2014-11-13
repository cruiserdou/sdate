var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.userroles.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userrolesf_grid',
    store: 'syj_userroles',
    selModel: sm,
    id :'grid_userroles',
    initComponent: function () {
        this.columns = [
            {text: '角色ID', width: 120, dataIndex: 'roleid',hidden:true},
            {text: '用户ID', flex: 1, dataIndex: 'userid',hidden:true},
            {text: '角色名称', width: 120, dataIndex: 'rolename'},
            {text: '用户名', flex: 1, dataIndex: 'username'}
        ];

        this.viewConfig = {
            forceFit: true
        };

        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_userroles',
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