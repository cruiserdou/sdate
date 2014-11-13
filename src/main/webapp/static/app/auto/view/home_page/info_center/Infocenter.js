Ext.define('App.view.home_page.info_center.Infocenter', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.resource_info',
    border: false,
    iconCls: "icon_paper_doc",
    initComponent: function () {
        this.items = [
            {
                autoScroll: true,
                xtype: 'demand',
                title: '需求'
            },
            {
                xtype: 'supply',
                title: '供应'
            }
//            ,
//            {
//                xtype: 'panel',
//                title: 'Browser',
//                deferredRender: false,
//                autoScroll: true
////                html:' <iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+'http://zhixing.court.gov.cn/search//'+'"> </iframe>'
////                loader: {
////                    autoLoad:true,
////                    url :'http://www.baidu.com'
////                }
//            }
        ];
        this.callParent(arguments);
    }
});
