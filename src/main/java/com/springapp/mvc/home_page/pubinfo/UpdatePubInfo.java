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
@RequestMapping("/update_pub_info")
public class UpdatePubInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
            HttpSession session,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "content", required = false) String content,
            @RequestParam(value = "pub_date", required = false) String pub_date,
            @RequestParam(value = "rec_user", required = false) String rec_user,
            @RequestParam(value = "rec_group", required = false) String rec_group,
            @RequestParam(value = "remark", required = false) String remark,
            @RequestParam(value = "file", required = false) MultipartFile file
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

            String sql = "UPDATE work.pub_info SET" +
                    " content=?, pub_user=?, pub_date=?, rec_user=?, rec_group=?, remark=?, file_url = ? " +
                    " WHERE title = ?";
            pst = conn.prepareStatement(sql);
            pst.setString(1, content);
            pst.setString(2, (String) session.getAttribute("user"));

            java.sql.Date sql_pub_date = null;
            if (pub_date != null && pub_date.length() > 2)
                sql_pub_date = java.sql.Date.valueOf(pub_date);
            pst.setDate(3, sql_pub_date);
            pst.setString(4, rec_user);
            pst.setString(5, rec_group);
            pst.setString(6, remark);
            pst.setString(7, file.getOriginalFilename());
            pst.setString(8, title);

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
