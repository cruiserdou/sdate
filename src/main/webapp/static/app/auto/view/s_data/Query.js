var s_dt;
Ext.define('App.view.s_data.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.s_data_query',
    split: true,
    height: 80,
    bodyPadding: 20,
    id: 'br_query',
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
    layout: 'column',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: true,
            items: [
                {
                    xtype: 'datefield',
                    labelWidth: 70,
                    labelAlign: 'right',
                    fieldLabel: '生成日期',
                    name: 'cust_dt',
                    id: 'query_grid_s_c_data',
                    autoRender: true,
                    autoShow: true,
                    value: Date(),
                    format: 'Y-m-d',
                    listeners: {

                        change: function (_this, newValue) {
                            s_dt =newValue ;
                        }
                    }
                },
                {
                    text: '生成数据',
                    iconCls: 'icon_add',
                    listeners: {
                        click: function () {
                            if(s_dt==null){
                                Ext.Msg.alert("失败", "请先选择生成日期!");
                            }else{
                                Ext.Ajax.request({
                                    url: 'sdata_cust_info',
                                    params: {
                                        "c_date": s_dt
                                    },
                                    waitMsg: '正在删除数据...',
                                    success: function (form, action) {
                                        Ext.Msg.alert("成功", "数据生成成功!");
//                                        Ext.getCmp('grid_s_data').getStore().reload();
                                        var store = Ext.getCmp('grid_s_data').getStore();
                                        store.load({
                                            params: {
                                                cust_dt: s_dt
                                            }
                                        });
                                    },
                                    failure: function (form, action) {
                                        Ext.Msg.alert("失败", "数据生成失败!");
                                    }
                                });
                            }

                        }
                    }
                },
                {
                    text: '刷新',
                    iconCls: 'icon_table_refresh',
                    listeners: {
                        click: function(_this){
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_cust').getStore().load();
                        }
                    }
                }, 
                {
                    id: 'cust_print',
                    iconCls: 'icon_excel',
                    text: '导出',
                    listeners: {
                        click: function () {
                            if(Ext.getCmp('query_grid_s_data_dt').getValue()==null){
                                Ext.Msg.alert("失败", "请先选择历史日期!");
                                return;
                            }
                                Ext.create('widget.window', {
                                    xtype: 'form',
                                    frame: true,
                                    modal: true,
                                    width: 200,
                                    height: 200,
                                    title: '导出',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        pack: 'start'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyPadding: '20',
                                            flex: 1,
                                            html: '<a onclick="cust_export();"  href="#"><img style="height: 32px; margin-left: 50px;" src="static/css/images/doc.png" />导出</a><br/>'
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            bodyPadding: '20',
                                            html: '<a href="static/upload/new_s_data.xlsx"><img style="width: 32px; margin-left: 50px;" src="static/css/images/cloud-download.png" />下载</a>'
                                        }
                                    ]
                                }).show(Ext.get('cust_print'));
                        }
                    }
                }
                 
            ]
        }
    ],
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
                    xtype: 'datefield',
                    fieldLabel: '历史日期',
                    id: 'query_grid_s_data_dt',
                    format: 'Y-m-d',
                    emptyText: '历史日期',
                    listeners: {
                    "blur": function (field) {
                        Ext.Ajax.request({
                            method: "POST",
                            params: {
                                last_dt: field.getValue()
                            },
                            url: 'checked_last_dt_info',
                            success: function (response, opts) {
                                var obj = Ext.decode(response.responseText);
                                if (!obj.success) {
                                    Ext.Msg.alert("提示", "所选历史日期没有生成数据，请先生成数据！");
                                    Ext.getCmp('query_grid_s_data_dt').setValue("");
                                }
                            },
                            failure: function (form, action) {
//                                   Ext.Msg.alert("失败", "报考类型检验失败!");
                            }
                        });
                    }
                }
                }
            ]
        },
        {
            xtype: 'panel',
            border: false,
            items: [
                {
                    xtype: 'button',
                    iconCls: 'icon_search',
                    text: '查找',
                    listeners: {
                        click: function(){
                            var store = Ext.getCmp('grid_s_data').getStore();
                            store.load({
                                params: {
                                    cust_dt: Ext.getCmp('query_grid_s_data_dt').getValue()
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'icon_reset',
                    text: '重置',
                    listeners: {
                        click: function(_this){
                            _this.up('form').getForm().reset();
                            Ext.getCmp('grid_s_data').getStore().load();
                        }
                    }
                }
            ]
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});


function cust_export() {

    Ext.Ajax.request({
        url: 'print_cust_info',
        params: {
            dt: Ext.getCmp('query_grid_s_data_dt').getValue()
        },
        waitMsg: '正在导出数据...',
        success: function (form, action) {
            Ext.Msg.alert("成功", "导出成功!");
        },
        failure: function (form, action) {
            Ext.Msg.alert("失败", "导出失败!");
        }
    });

};


