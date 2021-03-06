Ext.define('App.view.home_page.pub_mgr.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pubmgr_query',
    split: true,
    height: 100,
    bodyPadding: 20,
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
    id: 'pubmgr_query_id',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            border: true,
            items: [
                {
                    id: 'pubmgr_add',
                    text: '发布信息',
                    iconCls: 'icon_add',
                    listeners: {
                        click: function () {
                            Ext.create('widget.window', {
                                title: '发布信息',
                                modal: true,
                                iconCls: 'icon_add',
                                width: 350,
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
                                                fieldLabel: 'ID',
                                                name: 'id'
                                            },
                                            {
                                                anchor: '100%',
                                                xtype: 'textfield',
                                                name: 'title',
                                                fieldLabel: '公告标题'
                                            },
                                            {
                                                anchor: '100%',
                                                xtype: 'textarea',
                                                name: 'content',
                                                fieldLabel: '公告内容'
                                            },
                                            {
                                                anchor: '100%',
                                                xtype: 'datefield',
                                                name: 'pub_date',
                                                format: 'Y-m-d',
                                                value: new Date(),
                                                fieldLabel: '发布日期'
                                            },
                                            {
                                                anchor: '100%',
                                                hidden: 'true',
                                                name: 'rec_user',
                                                fieldLabel: '接收人'
                                            },
                                            {
                                                anchor: '100%',
                                                hidden: 'true',
                                                name: 'rec_group',
                                                fieldLabel: '接收人'
                                            },
                                            {
                                                anchor: '100%',
                                                xtype: 'filefield',
                                                fieldLabel: '添加附件',
                                                name: 'file',
                                                buttonText: '选择文件'
                                            },
                                            {
                                                anchor: '100%',
                                                xtype: 'textarea',
                                                name: 'remark',
                                                fieldLabel: '备注'
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
                                                            url: 'add_pub_info',
                                                            waitMsg: '正在保存数据...',
                                                            success: function(form, action){
                                                                Ext.Msg.alert("成功", "数据保存成功!");
                                                                //重新载入渠道信息
                                                                Ext.getCmp('grid_pubmgr').getStore().reload();
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
                            }).show(Ext.get('pubmgr_add'));
                        }
                    }
                },

//                {
//                    text: '编辑',
//                    id: 'roles_edit',
//                    iconCls: 'icon_edit',
//                    handler: function(){
//                        var sm = Ext.getCmp('grid_pubmgr').getSelectionModel();
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
//                                    hidden: 'true',
//                                    fieldLabel: '角色ID',
//                                    name: 'id'
//                                },
//                                {
//                                    anchor: '100%',
//                                    fieldLabel: '角色名称',
//                                    name: 'rolename'
//                                },
//                                {
//                                    anchor: '100%',
//                                    xtype: 'textarea',
//                                    fieldLabel: '角色描述',
//                                    name: 'roledesc'
//                                },
//                                {
//                                    anchor: '100%',
//                                    xtype: 'textarea',
//                                    fieldLabel: '备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
//                                    name: 'remark'
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
//                                                url: 'update_roles_info',
//                                                waitMsg: '正在保存数据...',
//                                                success: function(form, action){
//                                                    Ext.Msg.alert("成功", "数据保存成功!");
//                                                    Ext.getCmp('grid_pubmgr').getStore().reload();
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
//                            width: 350,
//                            height: 350,
//                            modal: true,
//                            title: '修改角色',
//                            items: [editForm]
//                        });
//                        editWindow.show(Ext.get('roles_edit'));
//                        editForm.getForm().loadRecord(record);
//                    }
//                },

                {
                    text: '删除',
                    iconCls: 'icon_delete',
                    handler: function () {
                        Ext.Msg.confirm('信息', '确定要删除？', function (btn) {
                            if (btn == 'yes') {
                                var sm = Ext.getCmp('grid_pubmgr').getSelectionModel();
                                var rows = sm.getSelection();

                                if (rows.length > 0) {
                                    for (var i = 0; i < rows.length; i++) {
                                        var row = rows[i];
                                        var id = row.get('id');
                                        Ext.Ajax.request({
                                            url: 'delete_pub_info',
                                            params: {
                                                "id": id
                                            },
                                            waitMsg: '正在删除数据...',
                                            success: function (form, action) {
                                                Ext.Msg.alert("成功", "数据删除成功!");
                                                Ext.getCmp('grid_pubmgr').getStore().reload();
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
                    xtype: 'datefield',
                    id: 'pubmgr_pub_date',
                    format: 'Y-m-d',
                    name: 'pub_date',
                    fieldLabel: '发布日期',
                    emptyText: '发布日期'
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
                            var store = Ext.getCmp('grid_pubmgr').getStore();
                            store.load({
                                params: {
                                    pub_date: Ext.getCmp('pubmgr_pub_date').getValue()
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
                            Ext.getCmp('grid_pubmgr').getStore().load();
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