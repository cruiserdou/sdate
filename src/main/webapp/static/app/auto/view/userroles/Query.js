Ext.define('App.view.userroles.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userrolesf_query',
    split: true,
    height: 120,
    bodyPadding: 20,
    id: 'datacir_query',
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: true,
            items: [
                {
                    id: 'userroles_add',
                    text: '添加',
                    iconCls: 'icon_add',
                    listeners: {
                        click: function () {
                            Ext.create('widget.window', {
                                title: '添加用户角色信息',
                                modal: true,
                                iconCls: 'icon_add',
                                width: 300,
                                height: 300,
                                border: false,
                                layout: 'fit',
                                defaults: {
                                    width: 200,
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        xtype: 'form',
                                        frame: true,
                                        bodyPadding: 10,
                                        fieldDefaults: {
                                            labelAlign: 'left',
                                            labelWidth: 70
                                        },
                                        defaults: {
                                            labelAlign: 'right',
                                            xtype: 'textfield'
                                        },
                                        items: [
                                            {
                                                anchor: '100%',
                                                name: 'roleid',
                                                fieldLabel: '角色',
                                                xtype: 'combobox',
                                                autoRender: true,
                                                autoShow: true,
                                                store:'syj_roles',
                                                triggerAction: 'all',
                                                valueField: 'id',
                                                displayField: 'rolename'

                                            },
                                            {
                                                anchor: '100%',
                                                name: 'userid',
                                                fieldLabel: '用户',
                                                xtype: 'combobox',
                                                autoRender: true,
                                                autoShow: true,
                                                store:'syj_users',
                                                triggerAction: 'all',
                                                valueField: 'id',
                                                displayField: 'username'
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
                                                            url: 'add_userroles_info',
                                                            waitMsg: '正在保存数据...',
                                                            success: function(form, action){
                                                                Ext.Msg.alert("成功", "数据保存成功!");
                                                                //重新载入渠道信息
                                                                Ext.getCmp('grid_userroles').getStore().reload();
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
                            }).show(Ext.get('userroles_add'));
                        }
                    }
                },
//                {
//                    text: '编辑',
//                    id: 'userroles_edit',
//                    iconCls: 'icon_edit',
//                    handler: function(){
//                        var sm = Ext.getCmp('grid_userroles').getSelectionModel();
//                        var record = sm.getSelection()[0];
//
//                        if(!record){
//                            Ext.Msg.alert('信息','请选择要编辑的数据');
//                            return;
//                        }
//                        var record = sm.getSelection()[0];
//
//                        var editForm = null;
//                        var editWindow = null;
//                        editForm = new Ext.form.FormPanel({
//                            frame: true,
//                            fieldDefaults: {
//                                labelAlign: 'right',
//                                labelWidth: 70
//                            },
//                            defaults: {
//                                xtype: 'textfield'
//                            },
//                            items: [
//                                {
//                                    readOnly: true,
//                                    fieldLabel: '角色ID',
//                                    name: 'roleid'
//                                },
//                                {
//                                    fieldLabel: '用户ID',
//                                    name: 'userid'
//                                }
//                            ],
//                            buttonAlign : "center",
//                            buttons: [
//                                {
//                                    text: '保存',
//                                    iconCls: 'icon_save',
//                                    handler: function(){
//                                        var form = this.up('form').getForm();
//                                        if (form.isValid()){
//                                            form.submit({
//                                                url: 'update_userroles_info',
//                                                waitMsg: '正在保存数据...',
//                                                success: function(form, action){
//                                                    Ext.Msg.alert("成功", "数据保存成功!");
//                                                    Ext.getCmp('grid_userroles').getStore().reload();
//                                                },
//                                                failure: function(form, action){
//                                                    Ext.Msg.alert("失败", "数据保存失败!");
//                                                }
//                                            });
//                                        }
//                                    }
//                                },
//                                {
//                                    text: '重置',
//                                    iconCls: 'icon_reset',
//                                    handler: function () {
//                                        this.up('form').getForm().reset();
//                                    }
//                                }
//                            ]
//                        });
//                        editWindow = new Ext.Window({
//                            layout: 'fit',
//                            width: 300,
//                            height: 400,
//                            modal: true,
//                            items: [editForm]
//                        });
//                        editWindow.show(Ext.get('userroles_edit'));
//                        editForm.getForm().loadRecord(record);
//                    }
//                },
                {
                    text: '导出',
                    id: 'datacir_tool_export',
                    iconCls: 'icon_excel'
                },
                {
                    text: '刷新',
                    id: 'datacir_tool_refresh',
                    iconCls: 'icon_table_refresh'
                },
                {
                    text: '删除',
                    iconCls: 'icon_delete',
                    handler: function () {
                        Ext.Msg.confirm('信息', '确定要删除？', function (btn) {
                            if (btn == 'yes') {
                                var sm = Ext.getCmp('grid_userroles').getSelectionModel();
                                var rows = sm.getSelection();

                                if (rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        var userid = row.get('userid');
                                        Ext.Ajax.request({
                                            url: 'delete_userroles_info',
                                            params: {
                                                "userid": userid
                                            },
                                            waitMsg: '正在删除数据...',
                                            success: function (form, action) {
                                                Ext.Msg.alert("成功", "数据删除成功!");
                                                Ext.getCmp('grid_userroles').getStore().reload();
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert("失败", "数据删除失败!");
                                            }
                                        });
                                    }
                                } else {
                                    Ext.Msg.alert('提示', '请选择要删除的记录');
                                }
                            }
                        });
                    }
                }
            ]
        }
    ],
    defaults: {
    },
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: 'datacir_query_panel1',
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
                    fieldLabel: '角色名称',
                    id: 'ur_query_rolename',
                    name: 'rolename',
                    emptyText: '角色名称'
                },
                {
                    allowBlank: true,
                    fieldLabel: '用户名',
                    id: 'ur_query_username',
                    name: 'username',
                    emptyText: '用户名'
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
                            var store = Ext.getCmp('grid_userroles').getStore();
                            store.load({
                                params: {
                                    rolename: Ext.getCmp('ur_query_rolename').getValue(),
                                    username: Ext.getCmp('ur_query_username').getValue()
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
                            Ext.getCmp('grid_userroles').getStore().load();
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