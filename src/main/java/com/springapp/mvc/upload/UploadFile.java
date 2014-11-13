package com.springapp.mvc.upload;

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
import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

@Controller
@RequestMapping("/upload_file")
public class UploadFile {
    private static final int BUFFER_SIZE = 16 * 1024;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
                           @RequestParam(value = "file", required = false) MultipartFile file,
                           @RequestParam(value = "id" , required = false) Integer id,
                           @RequestParam(value = "dt" , required = false) String dt,
                           @RequestParam(value = "remark" , required = false) String remark
    ) throws Exception {
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);

        if (!file.isEmpty()) {
            String projectPath = request.getSession().getServletContext().getRealPath("/static/upload/");
            file.transferTo(new File(projectPath + "/" + file.getOriginalFilename()));
        }

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


            String sql = "insert into work.upload" +
                    "(id, file, dt, remark) " +
                    " values(?, ?, ?, ?)";
            pst = conn.prepareStatement(sql);
            pst.setInt(1, id);
            pst.setString(2, file.getOriginalFilename());
            java.sql.Date sql_dt = null;
            if (dt!= null && dt.length() > 2)
                sql_dt = java.sql.Date.valueOf(dt);
            pst.setDate(3, sql_dt);
            pst.setString(4, remark);



           pst.executeUpdate();

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
