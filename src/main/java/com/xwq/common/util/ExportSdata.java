package com.xwq.common.util;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.model.DataShop;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/export_sdata")
public class ExportSdata {
    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
            @RequestParam(value = "s_date", required = false) String s_date
    ) throws Exception {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        DataShop dataShop = new DataShop();
        List list = new ArrayList();

        try {
            Class.forName("org.postgresql.Driver").newInstance();
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }
        DBInfo connstr = new DBInfo();
        String url = connstr.getUrl();
        String user = connstr.getUser();
        String password = connstr.getPassword();
        try {
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();
            String projectPath_target = request.getSession().getServletContext().getRealPath("/static/upload/");
            String projectPath_template = request.getSession().getServletContext().getRealPath("/WEB-INF/static/export_template/");

            //创建新的Excel工作薄
            XSSFWorkbook workbook = new XSSFWorkbook(new FileInputStream(projectPath_template + "/" + "s_data.xlsx"));
            //获取样式
            XSSFCellStyle style = workbook.createCellStyle();
            XSSFFont font = workbook.createFont();
            font.setFontName("Songti SC Regular");
            style.setFont(font);
            //获取名为“客户补充登记信息”的工作表
            XSSFSheet sheet = workbook.getSheet("ser_icbc");

            String sql = "SELECT a.id, a.cust_nm, a.card_id, b.in_account1, b.in1, b.in_account2, b.in2, " +
                    " b.balance " +
                    " FROM fgw.tb_cust_info a, fgw.tb_s_data b " +
                    " WHERE a.card_id = b.card_id ";
            if (s_date != null && s_date.length() != 0)
                sql += " and c_date = '" + s_date + "'";
            sql = sql + " ORDER BY data_ser";

            rs = stmt.executeQuery(sql);

            int j = 1;

            //遍历数据，填充表格
            while (rs.next()) {
                XSSFRow row = sheet.createRow(j);
                for (int i = 1; i < 9; i++) {
                    XSSFCell cell = row.createCell(i - 1);
                    if (i == 5 || i == 7 || i == 8) {
                        cell.setCellValue(rs.getInt(i));
                    } else {
                        cell.setCellValue(rs.getString(i));
                    }
                    cell.setCellStyle(style);
                }
                j++;
            }
            XSSFRow row_sum = sheet.createRow(j);
            XSSFCell cell0 = row_sum.createCell(0);
            cell0.setCellValue("汇总");
            cell0.setCellStyle(style);
            XSSFCell cell_sum = row_sum.createCell(7);
            cell_sum.setCellFormula("sum(H2:H" + j + ")");
            cell_sum.setCellStyle(style);
            FileOutputStream fOut = new FileOutputStream(projectPath_target + "/" + "s_data.xlsx");

            //把相应的Excel工作薄存盘
            workbook.write(fOut);
            fOut.flush();
            fOut.close();
        } catch (SQLException e) {
            System.out.print(e.getMessage());
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                System.out.print(e.getMessage());
            }
        }
        dataShop.setSuccess(true);
        dataShop.setList(list);

        return dataShop;
    }
}






//Ext.create('widget.window', {
//        modal: true,
//        width: 168,
//        height: 180,
//        title: '数据导出',
//        layout: {
//        type: 'vbox',
//        align: 'stretch',
//        pack: 'start'
//        },
//        items: [
//        {
//        xtype: 'panel',
//        bodyPadding: '20',
//        flex: 1,
//        html: '<a onclick="g_report();" href="#"><img style="height: 32px; margin-left: 50px;" src="static/css/images/file1.png" /></a><br/><hr>'
//        },
//        {
//        xtype: 'panel',
//        flex: 1,
//        bodyPadding: '20',
//        html: '<a href="static/upload/s_data.xlsx"><img style="width: 32px; margin-left: 50px;" src="static/css/images/cloud-download.png" /></a>'
//        }
//        ]
//        }).show(Ext.get('export'));










//    //客户信息采集－资产信息
//    function obt_assets_insert() {
//        var form_obt_person = document.getElementById("obtain_person_form");
//        var form = document.getElementById("obtain_assets_form");
//        Ext.Ajax.request({
//                method: "POST",
//                params: {
//            id: form_obt_person['obt_id'].value,
//                    house_has: form['obt_house_has'].checked,
//                    house_detail: form['obt_house_detail'].value,
//                    house_number: form['obt_house_number'].value,
//                    car_has: form['obt_car_has'].checked,
//                    car_detail: form['obt_car_detail'].value,
//                    car_number: form['obt_car_number'].value,
//                    other_realestate_has: form['obt_other_realestate_has'].checked,
//                    other_realestate_detail: form['obt_other_realestate_detail'].value,
//                    credit_card_has: form['obt_creditcard_has'].checked,
//                    creditcard_overdue: form['obt_creditcard_overdue'].checked,
//                    creditcard_detail: form['obt_creditcard_detail'].value,
//                    creditcard_number: form['obt_creditcard_number'].value,
//                    unsecuriedloan_has: form['obt_unsecuriedloan_has'].checked,
//                    unsecuriedloan_overdue: form['obt_unsecuriedloan_overdue'].checked,
//                    unsecuriedloan_detail: form['obt_unsecuriedloan_detail'].value,
//                    unsecuriedloan_number: form['obt_unsecuriedloan_number'].value,
//                    mortgageloan_has: form['obt_mortgageloan_has'].checked,
//                    mortgageloan_overdue: form['obt_mortgageloan_overdue'].checked,
//                    mortgageloan_detail: form['obt_mortgageloan_detail'].value,
//                    mortgageloan_number: form['obt_mortgageloan_number'].value,
//                    grarantee_has: form['obt_guarantee_has'].checked,
//                    grarantee_over_due: form['obt_guarantee_has'].checked,
//                    grarantee_detail: form['obt_guarantee_detail'].value,
//                    grarantee_number: form['obt_guarantee_number'].value,
//                    debt_has: form['obt_debt_has'].checked,
//                    debt_overdue: form['obt_debt_overdue'].checked,
//                    debt_detail: form['obt_debt_detail'].value,
//                    other_debt_has: form['obt_other_debt_has'].checked,
//                    other_debt_overdue: form['obt_other_debt_overdue'].checked,
//                    other_debt_detail: form['obt_other_debt_detail'].value,
//                    gf_has: form['obt_gf_has'].checked,
//                    gf_detail: form['obt_gf_detail'].value,
//                    c_invest_number: form['obt_c_invest_number'].value,
//                    c_invest_detail: form['obt_c_invest_detail'].value,
//                    debt_remark: '备注'
//        },
//        url: 'add_obt_assets',
//                success: function () {
//            Ext.Msg.alert("提示", "修改成功！");
//        },
//        failure: function () {
//            Ext.Msg.alert("提示", "修改失败！");
//        }
//        });
//    }










//    //定时刷新任务列表
//    function work_list_refresh() {
//        var sdata = Ext.create('Ext.data.Store', {
//                model: 'App.model.Loanprocinst',
//                proxy: {
//            type: 'ajax',
//                    url: 'obtain_loan_procinst_test',
//                    actionMethods: {
//                read: 'POST'
//            },
//            reader: {
//                type: 'json',
//                        root: 'list'
//            }
//        },
//        autoLoad: true
//        });
//
//        sdata.load({
//                callback: function (records, operation, success) {
//            if (success) {
//                var myarray = new Array();
//                for (var i = 0; i < sdata.getCount(); i++) {
//                    myarray[i] = sdata.getAt(i).getData();
//                }
//
//                var obtain_panel = Ext.getCmp('worklist_div');
//                obtain_panel.tpl.overwrite(obtain_panel.body, myarray);
//            }
//        }
//        });
//    }