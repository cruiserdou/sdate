package com.springapp.mvc.depts;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.model.DataShop;
import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Controller
@RequestMapping("/update_depts_info")
public class UpdateDeptsInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam("id") Integer id,
            @RequestParam("deptname") String deptname,
            @RequestParam("deptdesc") String deptdesc,
            @RequestParam("remark") String remark

            ) throws Exception{
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);
        Connection conn = null;
        PreparedStatement pst = null;
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

            String sql = "update work.depts set " +
                    "deptname=?, deptdesc=?, remark=?" +
                    "where id = ?";
            pst = conn.prepareStatement(sql);
            pst.setString(1, deptname);
            pst.setString(2, deptdesc);
            pst.setString(3, remark);
            pst.setInt(4, id);
            pst.executeUpdate();



            dataShop.setSuccess(true);

        } catch (SQLException e) {
            System.out.print(e.getMessage());
        } finally {
            try {
                if (pst != null) pst.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                System.out.print(e.getMessage());
            }
        }

        return dataShop;
    }
}