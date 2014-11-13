Ext.define('App.view.users.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.usersf_query',
    split: true,
    height: 120,
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: true,
            items: [
                {
                    id: 'users_add',
                    text: '添加',
                    iconCls: 'icon_add',
                    listeners: {
                        click: function () {
                            Ext.create('widget.window', {
                                title: '添加用户基本信息',
                                modal: true,
                                iconCls: 'icon_add',
                                width: 300,
                                height: 350,
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
                                                hidden: 'true',
                                                fieldLabel: '用户ID',
                                                name: 'id'
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '用&nbsp&nbsp户&nbsp&nbsp名',
                                                name: 'username'
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '用户密码',
                                                name: 'password'
                                            },
                                            {
                                                xtype: "panel",
                                                anchor: '100%',
                                                layout: "column",
                                                fieldLabel: '性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别',
                                                xtype: 'radiogroup', anchor: '220%', columns: 20, items: [
                                                {boxLabel: "男", name: 'sex', inputValue: '男',checked: true},

                                                {boxLabel: "女", name: 'sex', inputValue: '女'}
                                            ]
                                            },
                                            {
                                                anchor: '100%',
                                                fieldLabel: '手&nbsp&nbsp机&nbsp&nbsp号',
                                                name: 'phone'
                                            },
                                            {
                                                anchor: '100%',
                                                name: 'deptid',
                                                fieldLabel: '部门',
                                                xtype: 'combobox',
                                                autoRender: true,
                                                autoShow: true,
                                                store:'Dept_store',
                                                triggerAction: 'all',
                                                valueField: 'id',
                                                displayField: 'deptname'
                                            },
                                            {
                                                anchor: '100%',
                                                xtype: 'textarea',
                                                fieldLabel: '联系地址',
                                                name: 'address'
                                            },

                                            {anchor: '100%',
                                                xtype: 'textarea',
                                                fieldLabel: '备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
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
                                                            url: 'add_users_info',
                                                            waitMsg: '正在保存数据...',
                                                            success: function(form, action){
                                                                Ext.Msg.alert("成功", "数据保存成功!");
                                                                //重新载入渠道信息
                                                                Ext.getCmp('grid_users').getStore().reload();
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
                            }).show(Ext.get('users_add'));
                        }
                    }
                },
                {
                    text: '编辑',
                    id: 'users_edit',
                    iconCls: 'icon_edit',
                    handler: function(){
                        var sm = Ext.getCmp('grid_users').getSelectionModel();
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
                                labelAlign: 'right',
                                labelWidth: 70
                            },
                            defaults: {
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    hidden: 'true',
                                    fieldLabel: '用户ID',
                                    name: 'id'
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '用&nbsp&nbsp户&nbsp&nbsp名',
                                    name: 'username'
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '用户密码',
                                    name: 'password'
                                },
                                {
                                    xtype: "panel",
                                    anchor: '100%',
                                    layout: "column",
                                    fieldLabel: '性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别',
                                    xtype: 'radiogroup', anchor: '220%', columns: 20, items: [
                                    {boxLabel: "男", name: 'sex', inputValue: '男',checked: true},

                                    {boxLabel: "女", name: 'sex', inputValue: '女'}
                                ]
                                },
                                {
                                    anchor: '100%',
                                    fieldLabel: '手&nbsp&nbsp机&nbsp&nbsp号',
                                    name: 'phone'
                                },
                                {
                                    anchor: '100%',
                                    name: 'deptid',
                                    fieldLabel: '部门',
                                    xtype: 'combobox',
                                    autoRender: true,
                                    autoShow: true,
                                    store:'Dept_store',
                                    triggerAction: 'all',
                                    valueField: 'id',
                                    displayField: 'deptname'
                                },
                                {
                                    anchor: '100%',
                                    xtype: 'textarea',
                                    fieldLabel: '联系地址',
                                    name: 'address'
                                },
                                {
                                    anchor: '100%',
                                    xtype: 'textarea',
                                    fieldLabel: '备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
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
                                                url: 'update_users_info',
                                                waitMsg: '正在保存数据...',
                                                success: function(form, action){
                                                    Ext.Msg.alert("成功", "数据保存成功!");
                                                    Ext.getCmp('grid_users').getStore().reload();
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
                            height: 350,
                            modal: true,
                            items: [editForm]
                        });
                        editWindow.show(Ext.get('users_edit'));
                        editForm.getForm().loadRecord(record);
                    }
                },
                {
                    text: '导出',
                    iconCls: 'icon_excel'
                },
                {
                    text: '刷新',
                    iconCls: 'icon_table_refresh'
                },
                {
                    text: '删除',
                    iconCls: 'icon_delete',
                    handler: function () {
                        Ext.Msg.confirm('信息', '确定要删除？', function (btn) {
                            if (btn == 'yes') {
                                var sm = Ext.getCmp('grid_users').getSelectionModel();
                                var rows = sm.getSelection();

                                if (rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        var id = row.get('id');
                                        Ext.Ajax.request({
                                            url: 'delete_users_info',
                                            params: {
                                                "id": id
                                            },
                                            waitMsg: '正在删除数据...',
                                            success: function (form, action) {
                                                Ext.Msg.alert("成功", "数据删除成功!");
                                                Ext.getCmp('grid_users').getStore().reload();
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
                    fieldLabel: '用户名',
                    name: 'username',
                    id: 'query_username',
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
                            var store = Ext.getCmp('grid_users').getStore();
                            store.load({
                                params: {
                                    username: Ext.getCmp('query_username').getValue()
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
                            Ext.getCmp('grid_custs').getStore().load();
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