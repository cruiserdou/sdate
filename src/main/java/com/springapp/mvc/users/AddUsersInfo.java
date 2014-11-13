package com.springapp.mvc.users;

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
@RequestMapping("/add_users_info")
public class AddUsersInfo {

    @RequestMapping( method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam("username") String username,
            @RequestParam("password") String pwd,
            @RequestParam("sex") String sex,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address,
            @RequestParam("deptid") Integer deptid,
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

            String sql = "insert into work.users" +
                    "( username, password, sex,  phone, address, " +
                    "  deptid,deptname ,remark) " +
                    " values(?, ?, ?, ?, ?,  ?,(select deptname from work.depts where id=?), ?)";
            pst = conn.prepareStatement(sql);
            pst.setString(1, username);
            pst.setString(2, pwd);
            pst.setString(3, sex);
            pst.setString(4, phone);
            pst.setString(5, address);
            pst.setInt(6, deptid);
            pst.setInt(7, deptid);
            pst.setString(8, remark);
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