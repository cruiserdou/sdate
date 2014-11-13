/**
 * Created by dou on 14-1-19.
 */
Ext.define('App.model.s_data', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'cust_nm', type: 'string'},
        {name: 'card_id', type: 'string'},
        {name: 'c_date'},
        {name: 'balance', type: 'int'},
        {name: 'in1', type: 'int'},
        {name: 'in2', type: 'int'},
        {name: 'out1', type: 'int'},
        {name: 'out2', type: 'int'},
        {name: 'in_account1', type: 'string'},
        {name: 'in_account2', type: 'string'},
        {name: 'out_account1', type: 'string'},
        {name: 'out_account2', type: 'string'}
    ]
});





