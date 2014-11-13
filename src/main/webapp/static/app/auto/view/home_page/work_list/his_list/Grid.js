Ext.define('App.view.home_page.work_list.his_list.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.work_list_his_grid',
    columnLines: true,
    enableLocking: true,
    animCollapse: true,
    store: 'Hitaskinst',
    id: 'work_list_his_grid',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: true,
            items: [
                {
                    text: '刷新',
                    iconCls: 'icon_refresh',
                    listeners: {
                        click: function(){
                            Ext.getCmp('work_list_his_grid').getStore().reload();
                        }
                    }
                }
            ]
        }
    ],
    initComponent: function () {
        this.columns = [
            {text: '任务名称', width: 100, dataIndex: 'name_'},
            {text: '任务描述', flex: 1, dataIndex: 'description_'},
            {text: '开始时间', width: 180, dataIndex: 'start_time_',
                renderer: function(val){
                    return new Date(val).toLocaleString();
                }
            },
            {text: '结束时间', width: 180, dataIndex: 'end_time_',
                renderer: function(val){
                    if (val == null){
                        return val
                    }
                    return new Date(val).toLocaleString();
                }
            }
        ];
        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'User',
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

