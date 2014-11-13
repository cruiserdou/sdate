package com.springapp.mvc.home_page.resource;

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

import javax.servlet.http.HttpSession;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Controller
@RequestMapping("/add_info_resource")
public class AddInfoResource {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpSession session,
            @RequestParam(value = "t_type", required = false) String t_type,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "r_nm", required = false) String r_nm,
            @RequestParam(value = "r_content", required = false) String r_content,
            @RequestParam(value = "pub_date", required = false) String pub_date,
            @RequestParam(value = "remark", required = false) String remark
    ) throws Exception {
        DataShop dataShop = new DataShop();
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

            String sql = "insert into busi.tb_resource" +
                    " (t_type, category, r_nm, r_content, publisher, pub_date, remark) " +
                    " values(?, ?, ?, ?, ?, ?, ?)";
            pst = conn.prepareStatement(sql);
            pst.setString(1, t_type);
            pst.setString(2, category);
            pst.setString(3, r_nm);
            pst.setString(4, r_content);
            pst.setString(5, (String) session.getAttribute("user"));
            java.sql.Date sql_pub_date = null;
            if (pub_date != null && pub_date.length() > 2)
                sql_pub_date = java.sql.Date.valueOf(pub_date);
            pst.setDate(6, sql_pub_date);
            pst.setString(7, remark);

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