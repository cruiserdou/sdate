var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.depts.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.deptf_grid',
    store: 'syj_depts',
    selModel: sm,
    id :'grid_depts',
    initComponent: function () {

        this.columns = [
            {text: '部门ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '部门名称', width: 120, dataIndex: 'deptname'},
            {text: '部门描述', width: 800, dataIndex: 'deptdesc'},
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_depts',
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