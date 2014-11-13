package com.springapp.mvc.cust_s_data_info;

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
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unchecked")
@Controller
@RequestMapping("/checked_last_dt_info")
public class CheckedlastDateInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            @RequestParam("last_dt") String last_dt,
            HttpSession session
    ) throws Exception{
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        DataShop dataShop = new DataShop();
        List list = new ArrayList();
        List listX = new ArrayList();
        String s_drvschool = session.getAttribute("user").toString();
        try{
            Class.forName("org.postgresql.Driver").newInstance();
        }catch (Exception e){
            System.out.print(e.getMessage());
        }
        DBInfo connstr = new DBInfo();
        String url = connstr.getUrl();
        String user = connstr.getUser();
        String password = connstr.getPassword();
        try{
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();
            int i_num_tj=0;

            String sql = "select  count(1) as num_tj " +
                    " from fgw.tb_s_data ";
            if (last_dt != null && last_dt.length() != 0)
                sql += " where c_date='" + last_dt + "'";
            else
                sql += " where 1=0";
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                i_num_tj = rs.getInt(1);
                if(i_num_tj==0 || rs.getString(1) == null){
                    dataShop.setSuccess(false);
                }else
                {
                    dataShop.setSuccess(true);
                }
            }

        }catch (SQLException e){
            System.out.print(e.getMessage());
        }finally {
            try{
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            }catch (SQLException e){
                System.out.print(e.getMessage());
            }
        }


//        dataShop.setList(list);


        return dataShop;
    }
}