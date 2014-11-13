/**
 * Created by dou on 14-1-19.
 */
Ext.define('App.model.Pubinfo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'title'},
        {name: 'content'},
        {name: 'pub_user'},
        {name: 'pub_date'},
        {name: 'rec_user'},
        {name: 'rec_group'},
        {name: 'remark'},
        {name: 'file_url'},
        {name: 'name'}
    ]
});

