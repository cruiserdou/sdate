Ext.Loader.setConfig({enabled: true});

Ext.require('Ext.container.Viewport');
Ext.require([
    'Ext.chart.*',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.form.*',
    'Ext.selection.CheckboxModel'
]);


/**
 * 系统主页的顶部区域，主要放置系统名称，菜单，和一些快捷按钮
 */
Ext.define('app.view.main.region.Top', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.maintop', // 定义了这个组件的xtype类型为maintop
    initComponent: function () {
        Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性
        this.callParent(arguments);
    },
    height: 40,

    items: [
        {
            text: '首页',
            glyph: 0xf015
        },
        {
            text: '帮助',
            glyph: 0xf059
        },
        {
            text: '关于',
            id: 'main-bar-about',
            glyph: 0xf06a,
            handler: function () {
                Ext.create('widget.window', {
                    title: '关于',
                    modal: true,
                    glyph: 0xf06a,
                    width: 380,
                    height: 240,
                    border: false,
                    layout: 'fit',
                    defaults: {
                        width: 200,
                        allowBlank: false
                    },
                    items: [
                        {
                            xtype: 'panel'
                        }
                    ]
                }).show(Ext.get('main-bar-about'));
            }
        },
//        {
//            xtype: 'label',
//            width: 100,
//            id: 'login_info_user_id',
//            listeners: {
//                afterrender: function(){
//                    var myStore = Ext.create('Ext.data.Store', {
//                        model: 'App.model.syj_users',
//                        proxy: {
//                            type: 'ajax',
//                            url: 'obtain_login_user',
//                            actionMethods: {
//                                read: 'POST'
//                            },
//                            reader: {
//                                type: 'json',
//                                root: 'list'
//                            }
//                        },
//                        autoLoad: false
//                    });
//
//                    myStore.load({
//                        callback: function (records, operation, success) {
//                            if (success) {
//                                Ext.getCmp('login_info_user_id').setText("【部门：" + records[0].get("deptname")+"】");
//                            }
//                        }
//                    });
//                }
//            }
//        },
        {
            xtype: 'label',
            width: 170,
            id: 'login_info_dept_id',
            listeners: {
                afterrender: function(){
                    var myStore = Ext.create('Ext.data.Store', {
                        model: 'App.model.syj_users',
                        proxy: {
                            type: 'ajax',
                            url: 'obtain_login_user',
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

                    myStore.load({
                        callback: function (records, operation, success) {
                            if (success) {
                                Ext.getCmp('login_info_dept_id').setText("【用户：" + records[0].get("username")+"】");
                            }
                        }
                    });
                }
            }
        },
        {
            xtype: 'label',
            text: ' 【 ' + Ext.Date.format(new Date(), 'Y-m-d h:i:s') + ' 】 '
        },
        '->',
        '->',
        {
            text: '修改密码',
            id: 'main-bar-password',
            glyph: 0xf084,
            handler: function () {
                var channel_update = Ext.create('Ext.form.Panel', {
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
                            name: 'old_pass',
                            fieldLabel: '原密码',
                            inputType: 'password',
                            emptyText: '必填',
                            allowBlank: false
                        },
                        {
                            id: 'm_p_1',
                            name: 'new_pass1',
                            fieldLabel: '输入新密码',
                            inputType: 'password',
                            emptyText: '必填',
                            allowBlank: false
                        },
                        {
                            id: 'm_p_2',
                            name: 'new_pass2',
                            fieldLabel: '新密码确认',
                            inputType: 'password',
                            emptyText: '必填',
                            allowBlank: false
                        }
                    ],
                    buttonAlign: "center",
                    buttons: [
                        {
                            text: '确定',
                            iconCls: 'icon_save',
                            handler: function () {
                                if (Ext.getCmp('m_p_1').getValue() != Ext.getCmp('m_p_2').getValue()) {
                                    Ext.Msg.alert("提示", "新密码输入不一致！请重新输入。");
                                    return;
                                }
                                var form = this.up('form').getForm();
                                if (form.isValid()) {
                                    form.submit({
                                        method: 'POST',
                                        url: 'update_pass',
                                        waitMsg: '正在保存...',
                                        success: function () {
                                            Ext.Msg.alert("成功", "密码修改成功!");
                                            form.reset();
                                        },
                                        failure: function () {
                                            Ext.Msg.alert("失败", "密码修改失败!</br>原密码输入错误。");
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
                Ext.create('widget.window', {
                    title: '修改登录密码',
                    modal: true,
                    glyph: 0xf084,
                    width: 270,
                    height: 170,
                    border: false,
                    layout: 'fit',
                    defaults: {
                        width: 200,
                        allowBlank: false
                    },
                    items: [channel_update]
                }).show(Ext.get('main-bar-password'));
            }
        },
        {
            text: '注销',
            glyph: 0xf011,
            handler: function () {
                //定义Ajax请求，删除session

                window.history.back(-1);
            }
        }
    ]
});

Ext.application({
    name: 'App',
    appFolder: 'static/app/auto',
    initComponent: function () {
        Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性
        this.callParent(arguments);
    },
    controllers: ['Tabitem', 'Frame'],
    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    xtype: 'maintop',
                    margin: '0 0 2 0',
                    region: 'north' // 把他放在最顶上
                },
                {
                    xtype: 'navPanel',
                    region: 'west',
                    width: 200
                },
                {
                    xtype: 'tabPanel',
                    region: 'center',
                    layout: 'border'
                }
            ]
        });
    }
});