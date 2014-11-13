var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.dicts.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dictsf_grid',
    store: 'syj_dicts',
    selModel: sm,
    id :'grid_dicts',
    initComponent: function () {

        this.columns = [
            {text: '字典ID', width: 80, dataIndex: 'id',hidden:true},
            {text: '字段', width: 220, dataIndex: 'field'},
            {text: '字段名称', width: 220, dataIndex: 'fieldnm'},
            {text: '字段值', width: 220, dataIndex: 'fieldval'},
            {text: '字段显示名称', width: 220, dataIndex: 'fieldvaldis'},
            {text: '备注', flex: 1, dataIndex: 'remark'}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_dicts',
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