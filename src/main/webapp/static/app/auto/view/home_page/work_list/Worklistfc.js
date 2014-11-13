Ext.define('App.view.home_page.work_list.Worklistfc', {
    extend: 'Ext.panel.Panel',
    border: false,
    alias: 'widget.work_list_c',
    layout: 'border',
    iconCls: 'icon_order',
    worklistTpl: [
        '<div class="worklist_wrap">',
        "<tpl for='.'>",
        '<div class="work_list_content">',
        '<div class="start_time">{[new Date(values.start_time_).toLocaleString()]}</div>',
        '<div class="content">工作内容:<br/>',
        '<p class="work_content">',
        '<div style="margin: 5px 0 0 25px;font-size: 12px; font-weight: normal">{description_}</div>',
        '<div style="margin: 5px 0 0 20px;">',
        '<a style="margin-top: 3px;font-size: 12px;" id="{id_}" ',
        'onclick="deal_work(\'{id_}\', \'{id_}\', \'{proc_inst_id_}\', \'{proc_def_id_}\', \'{text_}\');">处理任务</a><br/>',
        '</div>',
        '</p>',
        '</div>' ,
        '<img class="user_img" alt="{start_user_id}" width="115px" src="static/css/images/{start_user_id_}.jpg" />',
        '</div>',
        "</tpl>",
        '</div>'
    ],
    initComponent: function () {
        this.items = [
            {
                id: 'worklist_div',
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
                                text: '新建任务',
                                id: 'work_list_new',
                                glyph: 0xf016,
                                listeners: {
                                    click: function () {
                                        Ext.create('widget.window', {
                                            title: '启动普通工作流',
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
                                                        xtype: 'combobox'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: '处理人',
                                                            name: 'user_id',
                                                            store: 'User',
                                                            displayField: 'name',
                                                            valueField: 'user_nm'
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: '处理期限',
                                                            format: 'Y-m-d',
                                                            name: 'deadline'
                                                        },
                                                        {
                                                            xtype: 'textarea',
                                                            name: 'content',
                                                            fieldLabel: '工作内容'
                                                        }
                                                    ],
                                                    buttonAlign: 'center',
                                                    buttons: [
                                                        {
                                                            text: '确定',
                                                            glyph: 0xf0c7,
                                                            handler: function () {
                                                                var form = this.up('form').getForm();
                                                                if (form.isValid()) {
                                                                    form.submit({
                                                                        url: 'start_personal_process',
                                                                        waitMsg: '正在启动流程...',
                                                                        success: function () {
                                                                            Ext.Msg.alert("成功", "流程已启动!");
                                                                        },
                                                                        failure: function () {
                                                                            Ext.Msg.alert("失败", "流程启动失败!");
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        },
                                                        {
                                                            text: '重置',
                                                            glyph: 0xf021,
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
                                glyph: 0xf021,
                                listeners: {
                                    click: function () {
                                       work_list_refresh();
                                    }
                                }
                            }
                        ]
                    }
                ],
                html: '工作列表',
                bodyStyle: 'background-color:  #EEEEEE',
                tpl: Ext.create('Ext.XTemplate', this.worklistTpl),
                listeners: {
                    afterrender: function () {
                        work_list_refresh();

                        setInterval("work_list_refresh()", 300000);
                    }
                }
            },
            {
                xtype: 'worklist_query',
                region: 'north'
            }
        ];
        this.callParent(arguments);
    }
});
