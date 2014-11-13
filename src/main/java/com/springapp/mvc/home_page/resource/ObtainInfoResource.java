package com.springapp.mvc.home_page.resource;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.model.DataShop;
import com.xwq.common.util.ConvertToList;
import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/obtain_info_resource")
public class ObtainInfoResource {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam(value = "publisher", required = false) String pub_user,
            @RequestParam(value = "pub_date", required = false) String pub_date,
            @RequestParam(value = "t_type", required = false) String t_type,
            @RequestParam(value = "r_content", required = false) String content,
            @RequestParam(value = "r_name", required = false) String rec_user
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

            String sql = "SELECT a.*, b.name FROM busi.tb_resource a, busi.tb_user b WHERE a.publisher= b.user_nm ";

//            if (pub_user != null && pub_user.length() != 0)
//                sql += " and pub_user = '" + pub_user + "' ";
//            if (rec_user != null && rec_user.length() != 0)
//                sql += " and rec_user = '" + rec_user + "' ";
//            if (pub_date != null && pub_date.length() != 0)
//                sql += " and pub_date = '" + pub_date + "' ";
//            if (content != null && content.length() != 0)
//                sql += " and content like  '%" + content + "%' ";
            if (t_type != null && t_type.length() != 0)
                sql += " and t_type like  '%" + t_type + "%' ";

            sql += " ORDER BY pub_date DESC;";

            rs = stmt.executeQuery(sql);

            list = new ConvertToList().convertList(rs);
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