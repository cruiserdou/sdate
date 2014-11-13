var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.users.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usersf_grid',
    store: 'syj_users',
    selModel: sm,
    id :'grid_users',
    initComponent: function () {
        this.columns = [
            {text: '用户ID', width: 80, dataIndex: 'id', hidden:true},
            {text: '用户名', width: 200, dataIndex: 'username', sortable: true},
            {text: '用户密码', width: 100, dataIndex: 'password',hidden:true},
            {text: '性别', width: 100, dataIndex: 'sex'},
            {text: '用户手机号', width: 180, dataIndex: 'phone'},
            {text: '联系地址', width: 300, dataIndex: 'address'},

            {text: '部门', width: 100, dataIndex: 'deptid',hidden:true},
            {text: '部门名称', width: 150, dataIndex: 'deptname'},
            {text: '备注',flex: 1, dataIndex: 'remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_users',
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