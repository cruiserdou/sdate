package com.springapp.mvc.tree;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.*;

@Controller
@RequestMapping(value = "/ojson", produces = {"application/json;charset=UTF-8"})

public class ObtainJson {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    String getShopInJSON(
            HttpServletRequest request,
            HttpSession session) throws Exception {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

//        String user_id = session.getAttribute("user_id").toString();
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

            String sql = "select v_leaf_list from work.menu_lists(" + session.getAttribute("id").toString() + ")";

            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                String jobdesc = rs.getString(1);
                return jobdesc;
            }
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

        return "error";
    }
}