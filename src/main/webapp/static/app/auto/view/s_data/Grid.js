Ext.define('App.view.s_data.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.s_data_grid',
    store: 's_data',
    selModel: new Ext.selection.CheckboxModel({checkOnly: false}),
    id :'grid_s_data',
    initComponent: function () {

        this.columns = [
            {text: '身份证', width: 150, dataIndex: 'card_id'},
            {text: '日期', width: 150, dataIndex: 'c_date'},
            {text: 'balance', width: 150, dataIndex: 'balance'},
            {text: '序号', width: 150, dataIndex: 'data_ser'},
            {text: '入账卡1', width: 150, dataIndex: 'in_account1'},
            {text: '入账卡2', width: 150, dataIndex: 'in_account2'},
            {text: '出账卡1', width: 150, dataIndex: 'out_account1'},
            {text: '出账卡2', width: 150, dataIndex: 'out_account2'},
            {text: '入金额1', width: 150, dataIndex: 'in1'},
            {text: '入金额2', width: 150, dataIndex: 'in2'},
            {text: '出金额1', width: 150, dataIndex: 'out1'},
            {text: '出金额2', width: 150, dataIndex: 'out2'}
        ];

        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 's_data',
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