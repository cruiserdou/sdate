Ext.define('App.view.home_page.public_info.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pubinfo_query',
    split: true,
    bodyPadding: 20,
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    defaultType: 'textfield',
    id: 'pubinfo_query_id',
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
                    xtype: 'combobox',
                    id: 'pub_info_user_id',
                    fieldLabel: '发送人',
                    store: 'User',
                    displayField: 'name',
                    valueField: 'user_nm',
                    emptyText: '发送人'
                },
                {
                    xtype: 'datefield',
                    id: 'pub_info_pub_date',
                    format: 'Y-m-d',
                    fieldLabel: '发布日期',
                    emptyText: '发布日期'
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
                    xtype: 'combobox',
                    allowBlank: true,
                    fieldLabel: '接收人',
                    id: 'pub_info_rec_user',
                    store: 'User',
                    displayField: 'name',
                    valueField: 'user_nm',
                    emptyText: '接收人'
                },
                {
                    allowBlank: true,
                    fieldLabel: '内容',
                    id: 'pub_info_content',
                    emptyText: '内容'
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
                    text: '查找',
                    listeners: {
                        click: function(){
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
                                    pub_user: Ext.getCmp('pub_info_user_id').getValue(),
                                    pub_date: Ext.getCmp('pub_info_pub_date').getValue(),
                                    rec_user: Ext.getCmp('pub_info_rec_user').getValue(),
                                    content: Ext.getCmp('pub_info_content').getValue()
                                },
                                callback: function(records, operation, success){
                                    if (success) {
                                        var myarray = new Array();
                                        for (var i = 0; i < sdata.getCount(); i++) {
                                            myarray[i] = sdata.getAt(i).getData();
                                        }

                                        var pubinfo_panel = Ext.getCmp('pubinfo_div');
                                        pubinfo_panel.tpl.overwrite(pubinfo_panel.body, myarray);
                                    }
                                }
                            })
                        }
                    }
                },
                {
                    xtype: 'panel',
                    height: 6,
                    border: false
                },
                {
                    xtype: 'button',
                    iconCls: 'icon_reset',
                    text: '重置',
                    listeners: {
                        click: function(){
                            Ext.getCmp('pubinfo_query_id').getForm().reset();
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
                                    pub_user: Ext.getCmp('pub_info_user_id').getValue(),
                                    pub_date: Ext.getCmp('pub_info_pub_date').getValue(),
                                    rec_user: Ext.getCmp('pub_info_rec_user').getValue(),
                                    content: Ext.getCmp('pub_info_content').getValue()
                                },
                                callback: function(records, operation, success){
                                    if (success) {
                                        var myarray = new Array();
                                        for (var i = 0; i < sdata.getCount(); i++) {
                                            myarray[i] = sdata.getAt(i).getData();
                                        }

                                        var pubinfo_panel = Ext.getCmp('pubinfo_div');
                                        pubinfo_panel.tpl.overwrite(pubinfo_panel.body, myarray);
                                    }
                                }
                            })
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