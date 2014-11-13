package com.springapp.mvc.cust_s_data_info;

/**
* Created by xwq on 14-4-15.
*/

import com.xwq.common.model.DataShop;
import com.xwq.common.util.DBInfo;
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
@RequestMapping("/print_cust_info")
public class ExportCustInfo {
    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
            @RequestParam(value = "dt", required = false) String dt
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
            String projectPath_template = request.getSession().getServletContext().getRealPath("/static/upload/");
//            String projectPath_template= request.getSession().getServletContext().getRealPath("/WEB-INF/static/export_template/");

//            HttpServletRequest request = ServletActionContext.getRequest();
            String projectPath_target = projectPath_template;
//            String projectPath_template = request.getSession().getServletContext().getRealPath("/WEB-INF/export_template/");

            //创建新的Excel工作薄
            XSSFWorkbook workbook = new XSSFWorkbook(new FileInputStream(projectPath_template + "/" + "s_data.xlsx"));
            //获取样式
            XSSFCellStyle style = workbook.createCellStyle();
            XSSFFont font = workbook.createFont();
            font.setFontName("Songti SC Regular");
            style.setFont(font);
            //获取名为“客户补充登记信息”的工作表
            XSSFSheet sheet = workbook.getSheet("ser_icbc");

//            java.util.Date u_date = new java.util.Date();
//            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
//            String s_date = df.format(u_date);

            String sql = "SELECT a.id, a.cust_nm, a.card_id, b.in_account1, b.in1, b.in_account2, b.in2, b.balance " +
                    " FROM fgw.tb_cust_info a, fgw.tb_s_data b " +
                    " WHERE a.card_id = b.card_id and c_date = '"+dt+"'";


//            if (s_date != null && s_date.length() != 0)
//                sql += " and c_date = '" + s_date + "'";
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
            FileOutputStream fOut = new FileOutputStream(projectPath_target + "/" + "new_s_data.xlsx");

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