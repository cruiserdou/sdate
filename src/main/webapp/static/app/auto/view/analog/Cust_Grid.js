//var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.analog.Cust_Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cust_grid',
    store: 'cust_info',
//    selModel: sm,
    selModel: new Ext.selection.CheckboxModel({checkOnly: false}),
    id :'grid_cust',
    initComponent: function () {

        this.columns = [
            {text: '序号', width: 120, dataIndex: 'id'},
            {text: '姓名', width: 200, dataIndex: 'cust_nm'},
            {text: '当前操作卡', flex: 1, dataIndex: 'card_id'}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'cust_info',
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