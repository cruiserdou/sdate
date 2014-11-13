Ext.define('App.view.home_page.info_center.Demand', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.demand',
    layout: 'border',
    iconCls: 'icon_order',
    demandTpl: [
        "<tpl for='.'>" ,
        '<div class="sd_wrap">' ,
        '<table>',
        '<tr>',
        '<th>编号</th>',
        '<td style="font-size: 12px;">{id}</td>',
        '</tr>',
        '<tr>',
        '<th>名称</th>',
        '<td>{r_nm}</td>',
        '</tr>',
        '<tr>',
        '<th>说明</th>',
        '<td>{r_content}</td>',
        '</tr>',
        '</table>',
        '</div>',
        "</tpl>"
    ],
    initComponent: function () {
        this.items = [
            {
                id: 'demand_div',
                autoScroll: true,
                region: 'center',
                xtype: 'panel',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        border: true,
                        items: [
                            {
                                text: '发布需求',
                                iconCls: 'icon_new',
                                listeners: {
                                    click: function () {
                                        Ext.create('widget.window', {
                                            title: '需求信息',
                                            modal: true,
                                            width: 280,
                                            height: 230,
                                            border: false,
                                            iconCls: 'icon_next',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'form',
                                                    frame: true,
                                                    bodyPadding: 20,
                                                    defaults: {
                                                        labelWidth: 60,
                                                        xtype: 'textfield'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: '需求分类',
                                                            name: 'category'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: '需求名称',
                                                            name: 'r_nm'
                                                        },
                                                        {
                                                            xtype: 'textarea',
                                                            name: 'r_content',
                                                            fieldLabel: '描述'
                                                        }
                                                    ],
                                                    buttonAlign: 'center',
                                                    buttons: [
                                                        {
                                                            text: '确定',
                                                            iconCls: 'icon_save',
                                                            handler: function () {
                                                                var form = this.up('form').getForm();
                                                                if (form.isValid()) {
                                                                    form.submit({
                                                                        url: 'add_info_resource',
                                                                        params: {
                                                                            t_type: '需求',
                                                                            pub_date: Ext.Date.format(new Date(), 'Y-m-d')
                                                                        },
                                                                        waitMsg: '正在保存...',
                                                                        success: function () {
                                                                            Ext.Msg.alert("成功", "保存成功!");
                                                                        },
                                                                        failure: function () {
                                                                            Ext.Msg.alert("失败", "保存失败!");
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        },
                                                        {
                                                            text: '重置',
                                                            iconCls: 'icon_refresh',
                                                            handler: function () {
                                                                this.up('form').getForm().reset();
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }).show(Ext.get("work_list_new"));
                                    }
                                }
                            },
                            '-',
                            {
                                text: '刷新',
                                iconCls: 'icon_refresh',
                                listeners: {
                                    click: function () {
                                        work_list_refresh();
                                    }
                                }
                            }
                        ]
                    }
                ],
                html: '需求列表',
                tpl: Ext.create('Ext.XTemplate', this.demandTpl),
                listeners: {
                    afterrender: function () {
                        var sdata = Ext.create('Ext.data.Store', {
                            model: 'App.model.Resourceinfo',
                            proxy: {
                                type: 'ajax',
                                url: 'obtain_info_resource',
                                actionMethods: {
                                    read: 'POST'
                                },
                                reader: {
                                    type: 'json',
                                    root: 'list'
                                }
                            }
                        });

                        sdata.load({
                            params: {
                                t_type: '需求'
                            },
                            callback: function (records, operation, success) {
                                if (success) {
                                    var myarray = new Array();
                                    for (var i = 0; i < sdata.getCount(); i++) {
                                        myarray[i] = sdata.getAt(i).getData();
                                    }

                                    var obtain_panel = Ext.getCmp('demand_div');
                                    obtain_panel.tpl.overwrite(obtain_panel.body, myarray);
                                }
                            }
                        });
                    }
                }
            }
        ];
        this.callParent(arguments);
    }
});