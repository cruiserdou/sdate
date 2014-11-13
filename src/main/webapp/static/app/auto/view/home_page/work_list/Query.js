Ext.define('App.view.home_page.work_list.Query', {
    extend: 'Ext.form.Panel',
    alias: 'widget.worklist_query',
    split: true,
    bodyPadding: 20,
    frame: false,
    collapseMode: 'mini',
    collapsed: false,
    useSplitTips: true,
    id: 'worklist_query_id',
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
                    id: 'worklist_query_owner_id',
                    xtype: 'combobox',
                    fieldLabel: '发送人',
                    store: 'User',
                    displayField: 'name',
                    valueField: 'user_nm',
                    name: 'custorm_nm',
                    emptyText: '发送人'
                },
                {
                    id: 'worklist_query_description',
                    fieldLabel: '内容',
                    name: 'custorm_business_des',
                    allowBlank: true,
                    emptyText: '内容'
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
                    format: 'Y-m-d',
                    fieldLabel: '开始时间',
                    name: 'link_person',
                    emptyText: '开始时间'
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
                    glyph: 0xf002,
                    text: '查找',
                    listeners: {
                        click: function(){
                            var sdata = Ext.create('Ext.data.Store', {
                                model: 'App.model.Loanprocinst',
                                proxy: {
                                    type: 'ajax',
                                    url: 'obtain_loan_procinst_test',
                                    actionMethods: {
                                        read: 'POST'
                                    },
                                    reader: {
                                        type: 'json',
                                        root: 'list'
                                    }
                                },
                                autoLoad: true
                            });

                            sdata.load({
                                params: {
                                    owner_id: Ext.getCmp('worklist_query_owner_id').getValue(),
                                    description: Ext.getCmp('worklist_query_description').getValue()
                                },
                                callback: function(records, operation, success){
                                    if (success) {
                                        var myarray = new Array();
                                        for (var i = 0; i < sdata.getCount(); i++) {
                                            myarray[i] = sdata.getAt(i).getData();
                                        }

                                        var obtain_panel = Ext.getCmp('worklist_div');
                                        obtain_panel.tpl.overwrite(obtain_panel.body, myarray);
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
                    glyph: 0xf021,
                    text: '重置',
                    listeners: {
                        click: function(){
                            Ext.getCmp('worklist_query_id').getForm().reset();
                            var sdata = Ext.create('Ext.data.Store', {
                                model: 'App.model.Loanprocinst',
                                proxy: {
                                    type: 'ajax',
                                    url: 'obtain_loan_procinst_test',
                                    actionMethods: {
                                        read: 'POST'
                                    },
                                    reader: {
                                        type: 'json',
                                        root: 'list'
                                    }
                                },
                                autoLoad: true
                            });

                            sdata.load({
                                params: {
                                    owner_id: Ext.getCmp('worklist_query_owner_id').getValue(),
                                    description: Ext.getCmp('worklist_query_description').getValue()
                                },
                                callback: function(records, operation, success){
                                    if (success) {
                                        var myarray = new Array();
                                        for (var i = 0; i < sdata.getCount(); i++) {
                                            myarray[i] = sdata.getAt(i).getData();
                                        }

                                        var obtain_panel = Ext.getCmp('worklist_div');
                                        obtain_panel.tpl.overwrite(obtain_panel.body, myarray);
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
