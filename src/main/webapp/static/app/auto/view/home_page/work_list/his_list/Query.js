Ext.define('App.view.home_page.work_list.his_list.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.work_list_his_query',
    split: true,
    bodyPadding: 20,
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            columnWidth: .4,
            border: false,
            defaultType: 'textfield',
            layout: {
                type: 'vbox',
                align: 'strech',
                pack: 'start'
            },
            items: [
                {
                    allowBlank: true,
                    fieldLabel: '任务名称',
                    name: 'id',
                    emptyText: '任务名称'
                },
                {
                    allowBlank: true,
                    fieldLabel: '任务描述',
                    name: 'belong_project',
                    emptyText: '任务描述'
                }
            ]
        },
        {

            xtype: 'panel',
            columnWidth: .4,
            border: false,
            defaultType: 'textfield',
            layout: {
                type: 'vbox',
                align: 'strech',
                pack: 'start'
            },
            items: [
                {
                    xtype: 'datefield',
                    allowBlank: true,
                    fieldLabel: '开始时间',
                    format: 'Y-m-d',
                    name: 'gender',
                    emptyText: '开始时间',
                    editable: false
                },
                {
                    xtype: 'datefield',
                    allowBlank: true,
                    fieldLabel: '结束时间',
                    format: 'Y-m-d',
                    name: 'inner_dev_nm',
                    emptyText: '结束时间'
                }
            ]
        },
        {
            xtype: 'panel',
            columnWidth: .2,
            border: false,
            layout: {
                type: 'vbox',
                align: 'strech',
                pack: 'start'
            },
            items: [
                {
                    xtype: 'button',
                    iconCls: 'icon_search',
                    text: '查找'
                },
                {
                    xtype: 'panel',
                    height: 10,
                    border: false
                },
                {
                    xtype: 'button',
                    iconCls: 'icon_reset',
                    text: '重置'
                }
            ]
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});