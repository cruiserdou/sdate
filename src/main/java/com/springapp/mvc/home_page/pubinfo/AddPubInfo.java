package com.springapp.mvc.home_page.pubinfo;

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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Controller
@RequestMapping("/add_pub_info")
public class AddPubInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
            HttpSession session,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("pub_date") String pub_date,
            @RequestParam("rec_user") String rec_user,
            @RequestParam("rec_group") String rec_group,
            @RequestParam("remark") String remark,
            @RequestParam("file") MultipartFile file
    ) throws Exception {
        if (!file.isEmpty()) {
            String projectPath = request.getSession().getServletContext().getRealPath("/static/upload/");
            file.transferTo(new File(projectPath + "/" + file.getOriginalFilename()));
        }


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

            String sql = "insert into work.pub_info" +
                    " (title, content, pub_user, pub_date, rec_user, rec_group, remark, file_url) " +
                    " values(?, ?, ?, ?, ?, ?, ?, ?)";
            pst = conn.prepareStatement(sql);
            pst.setString(1, title);
            pst.setString(2, content);
            pst.setString(3, (String) session.getAttribute("user"));
            java.sql.Date sql_pub_date = null;
            if (pub_date != null && pub_date.length() > 2)
                sql_pub_date = java.sql.Date.valueOf(pub_date);
            pst.setDate(4, sql_pub_date);
            pst.setString(5, rec_user);
            pst.setString(6, rec_group);
            pst.setString(7, remark);
            pst.setString(8, file.getOriginalFilename());

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