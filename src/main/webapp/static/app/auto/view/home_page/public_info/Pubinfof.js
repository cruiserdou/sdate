Ext.define('App.view.home_page.public_info.Pubinfof', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.public_info',
    layout: 'border',
    iconCls: 'icon_public_info',
    worklistTpl: [
            '<div class="pubinfo_wrap">' +
            '<div id="main_pubinfo">' +
            '<h2 style="margin-top: 0; color: #C43926;">公告信息<hr /></h2>' +
            "<tpl for='.'>" +
            '<div class="pubinfo_content" style="border-bottom: 1px solid #ccc; margin: 10px 0 10px 0;padding: 0 0 10px 0;">' +
            '<h3 style="color: #C43926;">{title}</h3><br/>{content}<div style="color: grey; margin: 16px 0 0 0;">发布日期：{pub_date}' +
            '<a style="margin:0 10px"> | 发布人：{name}</a>' +
            ' | 附件：<a style="" target="_blank" href="static/upload/{file_url}"><img src="static/css/images/down.png" style="height: 12px; cursor: hand;" /></a>',
            '</div>' +
            '</div>' +
            "</tpl>" +
            '</div>' +
            '</div>'
    ],
    worklistTplList: [
            '<div class="pubinfo_wrap_list">' +
            '<div id="list_pubinfo">' +
            '<h2 style="margin-top: 0; color: #C43926;">公告列表<hr /></h2>' +
            '<tpl for=".">' +
            '<li style="margin-top: 20px;"><a onclick="update_pubinfo_main(\'{id}\')" style="border: 1px solid #cccccc; padding: 2px 3px; border-radius: 5px; cursor: hand;color: #C43926;font-weight: bold;">{title}</a><br/><span style="margin-left: 1em;">{pub_date}</span></li>' +
            '</tpl>' +
            '</div>' +
            '</div>'
    ],
    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                region: 'center',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        border: true,
                        items: [
//                            {
//                                text: '发布信息',
//                                id: 'push_info',
//                                iconCls: 'icon_new',
//                                listeners: {
//                                    click: function () {
//                                        Ext.create('widget.window', {
//                                            title: '发布信息',
//                                            modal: true,
//                                            width: 300,
//                                            height: 330,
//                                            border: false,
//                                            layout: 'fit',
//                                            defaults: {
//                                                width: 200,
//                                                allowBlank: false
//                                            },
//                                            items: [
//                                                {
//                                                    xtype: 'form',
//                                                    frame: true,
//                                                    bodyPadding: 15,
//                                                    fieldDefaults: {
//                                                        labelAlign: 'left',
//                                                        labelWidth: 80
//                                                    },
//                                                    items: [
//                                                        {
//                                                            xtype: 'textfield',
//                                                            name: 'title',
//                                                            fieldLabel: '公告标题'
//                                                        },
//                                                        {
//                                                            xtype: 'textarea',
//                                                            name: 'content',
//                                                            fieldLabel: '公告内容'
//                                                        },
//                                                        {
//                                                            xtype: 'datefield',
//                                                            name: 'pub_date',
//                                                            format: 'Y-m-d',
//                                                            value: new Date(),
//                                                            fieldLabel: '发布日期'
//                                                        },
//                                                        {
//                                                            xtype: 'combobox',
//                                                            store: 'User',
//                                                            displayField: 'name',
//                                                            valueField: 'user_nm',
//                                                            name: 'rec_user',
//                                                            fieldLabel: '接收人'
//                                                        },
//                                                        {
//                                                            xtype: 'filefield',
//                                                            fieldLabel: '添加附件',
//                                                            name: 'file',
//                                                            buttonText: '选择文件'
//                                                        },
//                                                        {
//                                                            xtype: 'textarea',
//                                                            name: 'remark',
//                                                            fieldLabel: '备注'
//                                                        }
//                                                    ],
//                                                    buttonAlign: 'center',
//                                                    buttons: [
//                                                        {
//                                                            text: '添加',
//                                                            iconCls: 'icon_save',
//                                                            handler: function () {
//                                                                var form = this.up('form').getForm();
//                                                                if (form.isValid()) {
//                                                                    form.submit({
//                                                                        url: 'add_pub_info',
//                                                                        params: {
//                                                                            rec_group: '001'
//                                                                        },
//                                                                        waitMsg: '正在启动流程...',
//                                                                        success: function (form) {
//                                                                            Ext.Msg.alert("成功", "公告已发布!");
//                                                                            form.reset();
//                                                                        },
//                                                                        failure: function () {
//                                                                            Ext.Msg.alert("失败", "公告发布失败!");
//                                                                        }
//                                                                    });
//                                                                }
//                                                            }
//                                                        },
//                                                        {
//                                                            text: '清空',
//                                                            handler: function () {
//                                                                form.getForm().reset();
//                                                                form.button[0].setText('添加');
//                                                            }
//                                                        }
//
//                                                    ]
//                                                }
//
//                                            ]
//                                        }).show(Ext.get('push_info'));
//                                    }
//                                }
//                            },
//                            '-',
                            {
                                text: '刷新',
                                iconCls: 'icon_table_refresh',
                                listeners: {
                                    click: function () {
                                        var sdata = Ext.create('Ext.data.Store', {
                                            model: 'App.model.Pubinfo',
                                            proxy: {
                                                type: 'ajax',
                                                url: 'obtain_pub_info',
                                                actionMethods: {
                                                    read: 'POST'
                                                },
                                                reader: {
                                                    type: 'json',
                                                    root: 'list'
                                                }
                                            },
                                            autoLoad: false
                                        });
                                        sdata.load(function (records, operation, success) {
                                            if (success) {
                                                var myarray = new Array();
                                                for (var i = 0; i < sdata.getCount(); i++) {
                                                    myarray[i] = sdata.getAt(i).getData();
                                                }

                                                var pubinfo_panel = Ext.getCmp('pubinfo_div');
                                                pubinfo_panel.tpl.overwrite(pubinfo_panel.body, myarray);
                                            }
                                        });
                                    }
                                }
                            }
                        ]
                    }
                ],
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [
                    {
                        id: 'pubinfo_div',
                        xtype: 'panel',
                        border: false,
                        flex: 1,
                        bodyStyle: 'background-color:  #eee',
                        html: this.htmltpl,
                        tpl: Ext.create('Ext.XTemplate', this.worklistTpl),
                        listeners: {
                            afterrender: function () {
                                var sdata = Ext.create('Ext.data.Store', {
                                    model: 'App.model.Pubinfo',
                                    proxy: {
                                        type: 'ajax',
                                        url: 'obtain_pub_info',
                                        actionMethods: {
                                            read: 'POST'
                                        },
                                        reader: {
                                            type: 'json',
                                            root: 'list'
                                        }
                                    },
                                    autoLoad: false
                                });
                                sdata.load({
                                    params: {
                                        q_type: 'last'
                                    },
                                    callback: function (records, operation, success) {
                                        if (success) {
                                            var myarray = new Array();
                                            for (var i = 0; i < 1; i++) {
                                                myarray[i] = sdata.getAt(i).getData();
                                            }

                                            var pubinfo_panel = Ext.getCmp('pubinfo_div');
                                            pubinfo_panel.tpl.overwrite(pubinfo_panel.body, myarray);
                                        }
                                    }
                                });
                            }
                        }
                    },
                    {
                        xtype: 'panel',
                        width: 370,
                        id: 'pubinfo_div_list',
                        border: false,
                        htmltpl: '信息列表',
                        bodyStyle: 'background-color:  #eee',
                        tpl: Ext.create('Ext.XTemplate', this.worklistTplList),
                        listeners: {
                            afterrender: function () {
                                var sdata = Ext.create('Ext.data.Store', {
                                    model: 'App.model.Pubinfo',
                                    proxy: {
                                        type: 'ajax',
                                        url: 'obtain_pub_info',
                                        actionMethods: {
                                            read: 'POST'
                                        },
                                        reader: {
                                            type: 'json',
                                            root: 'list'
                                        }
                                    },
                                    autoLoad: false
                                });
                                sdata.load(function (records, operation, success) {
                                    if (success) {
                                        var myarray = new Array();
                                        for (var i = 0; i < sdata.getCount(); i++) {
                                            myarray[i] = sdata.getAt(i).getData();
                                        }

                                        var pubinfo_panel = Ext.getCmp('pubinfo_div_list');
                                        pubinfo_panel.tpl.overwrite(pubinfo_panel.body, myarray);
                                    }
                                });
                            }
                        }
                    }
                ]

            }
//            ,
//            {
//                xtype: 'pubinfo_query',
//                region: 'north'
//            }
        ];
        this.callParent(arguments);
    }
});
