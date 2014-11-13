Ext.define('App.view.dicts.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dictsf_query',
    split: true,
    height: 100,
    bodyPadding: 20,
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
                    id: 'dicts_add',
                    text: '添加',
                    iconCls: 'icon_add',
                    listeners: {
                        click: function () {
                            Ext.create('widget.window', {
                                title: '添加字典',
                                modal: true,
                                iconCls: 'icon_add',
                                width: 300,
                                height: 400,
                                border: false,
                                layout: 'fit',
                                defaults: {
                                    width: 150,
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        xtype: 'form',
                                        frame: true,
                                        bodyPadding: 10,
                                        fieldDefaults: {
                                            labelAlign: 'left',
                                            labelWidth: 90
                                        },
                                        defaults: {
                                            labelAlign: 'right',
                                            xtype: 'textfield'
                                        },
                                        items: [
                                            {
                                                hidden: 'true',
                                                fieldLabel: '字典ID',
                                                name: 'id'
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '字&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp段',
                                                name: 'field'
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '字&nbsp&nbsp&nbsp段&nbsp&nbsp&nbsp名&nbsp&nbsp称',
                                                name: 'fieldnm'
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '字&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp段&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp值',
                                                name: 'fieldval'
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '字段显示名称',
                                                name: 'fieldvaldis'
                                            },
                                            {
                                                anchor: '100%',
                                                xtype: 'textarea',
                                                fieldLabel: '备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
                                                name: 'remark'
                                            }
                                        ],
                                        buttonAlign : "center",
                                        buttons: [
                                            {
                                                text: '保存',
                                                iconCls: 'icon_save',
                                                handler: function(){
                                                    var form = this.up('form').getForm();
                                                    if (form.isValid()){
                                                        form.submit({
                                                            url: 'add_dicts_info',
                                                            waitMsg: '正在保存数据...',
                                                            success: function(form, action){
                                                                Ext.Msg.alert("成功", "数据保存成功!");
                                                                //重新载入渠道信息
                                                                Ext.getCmp('grid_dicts').getStore().reload();
                                                            },
                                                            failure: function(form, action){
                                                                Ext.Msg.alert("失败", "数据保存失败!");
                                                            }
                                                        });
                                                    }
                                                }
                                            },
                                            {
                                                text: '重置',
                                                iconCls: 'icon_reset',
                                                handler: function () {
                                                    this.up('form').getForm().reset();
                                                }
                                            }
                                        ]
                                    }

                                ]
                            }).show(Ext.get('dicts_add'));
                        }
                    }
                },
                {
                    text: '编辑',
                    id: 'dicts_edit',
                    iconCls: 'icon_edit',
                    handler: function(){
                        var sm = Ext.getCmp('grid_dicts').getSelectionModel();
                        var record = sm.getSelection()[0];

                        if(!record){
                            Ext.Msg.alert('信息','请选择要编辑的数据');
                            return;
                        }
                        var record = sm.getSelection()[0];

                        var editForm = null;
                        var editWindow = null;
                        editForm = new Ext.form.FormPanel({
                            frame: true,
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 90
                            },

                            defaults: {
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    hidden: 'true',
                                    fieldLabel: '字典ID',
                                    name: 'id'
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '字&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp段',
                                    name: 'field'
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '字&nbsp&nbsp&nbsp段&nbsp&nbsp&nbsp名&nbsp&nbsp称',
                                    name: 'fieldnm'
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '字&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp段&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp值',
                                    name: 'fieldval'
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '字段显示名称',
                                    name: 'fieldvaldis'
                                },
                                {
                                    anchor: '100%',
                                    xtype: 'textarea',
                                    fieldLabel: '备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
                                    name: 'remark'
                                }
                            ],
                            buttonAlign : "center",
                            buttons: [
                                {
                                    text: '保存',
                                    iconCls: 'icon_save',
                                    handler: function(){
                                        var form = this.up('form').getForm();
                                        if (form.isValid()){
                                            form.submit({
                                                url: 'update_dicts_info',
                                                waitMsg: '正在保存数据...',
                                                success: function(form, action){
                                                    Ext.Msg.alert("成功", "数据保存成功!");
                                                    Ext.getCmp('grid_dicts').getStore().reload();
                                                },
                                                failure: function(form, action){
                                                    Ext.Msg.alert("失败", "数据保存失败!");
                                                }
                                            });
                                        }
                                    }
                                },
                                {
                                    text: '重置',
                                    iconCls: 'icon_reset',
                                    handler: function () {
                                        this.up('form').getForm().reset();
                                    }
                                }
                            ]
                        });
                        editWindow = new Ext.Window({
                            layout: 'fit',
                            width: 300,
                            height: 400,
                            modal: true,
                            border: false,
                            defaults: {
                                width: 150,
                                allowBlank: false
                            },
                            title: '修改字典生',
                            items: [editForm]
                        });
                        editWindow.show(Ext.get('dicts_edit'));
                        editForm.getForm().loadRecord(record);
                    }
                },

                {
                    text: '导出',
                    id: 'geye_tool_export',
                    iconCls: 'icon_excel'
                },
                {
                    text: '刷新',
                    id: 'geye_tool_refresh',
                    iconCls: 'icon_table_refresh'
                },
                {
                    text: '删除',
                    iconCls: 'icon_delete',
                    handler: function () {
                        var sm = Ext.getCmp('grid_dicts').getSelectionModel();
                        var rows = sm.getSelection();
                        if (rows.length <= 0) {
                            Ext.Msg.alert('提示', '请选择要删除的记录');
                        } else{

                                if (rows.length > 1) {
                                    Ext.Msg.alert('提示', '每次只能删除一条！');
                                } else {
                                    Ext.Msg.confirm('信息', '确定要删除？', function (btn) {
                                        if (btn == 'yes') {
                                            var row = rows[0];
                                            var id = row.get('id');
                                            Ext.Ajax.request({
                                                url: 'delete_dicts_info',
                                                params: {
                                                    "id": id
                                                },
                                                waitMsg: '正在删除数据...',
                                                success: function (form, action) {
                                                    Ext.Msg.alert("成功", "数据删除成功!");
                                                    Ext.getCmp('grid_dicts').getStore().reload();
                                                },
                                                failure: function (form, action) {
                                                    Ext.Msg.alert("失败", "数据删除失败!");
                                                }
                                            });
                                        }
                                    });
                                }
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
                  allowBlank: true,
                  fieldLabel: '字段名称',
                  id: 'query_fieldnm',
                  name: 'fieldnm',
                  emptyText: '字段名称'
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
                            var store = Ext.getCmp('grid_dicts').getStore();
                            store.load({
                                params: {
                                    fieldnm: Ext.getCmp('query_fieldnm').getValue()
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
                            Ext.getCmp('grid_dicts').getStore().load();
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