package com.springapp.mvc.cust_s_data_info;

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
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/sdata_cust_info")
public class SCustDataInfo {

    @RequestMapping(method = RequestMethod.POST)

    public
    @ResponseBody
    DataShop getShopInJSON(
           @RequestParam(value = "c_date", required = false) String c_date
    ) throws Exception{

        Connection conn = null;
        PreparedStatement pst = null;
        Statement stmt = null;
        ResultSet rs = null;
        ResultSet rs_dt = null;
        ResultSet rs_up_account = null;
        ResultSet rs_sel = null;
        ResultSet rs_up_in = null;
        ResultSet rs_all = null;
        Map<String, Integer> c_balance = new HashMap<String, Integer>();
        Map<String, Integer> b_balance = new HashMap<String, Integer>();
//        java.sql.Date sql_c_date = null;
//        if (c_date != null && c_date.length() > 2)
//            sql_c_date = java.sql.Date.valueOf(c_date);
        //总分配金额
        double total_m = 0;
        //余额
        int balance;

        List list = new ArrayList();
        DataShop dataShop = new DataShop(); 



        try {
            Class.forName("org.postgresql.Driver").newInstance();
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }

        DBInfo connstr = new DBInfo();
        String url = connstr.getUrl();
        String user = connstr.getUser();
        String password = connstr.getPassword();

        try{
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();
            //获取上次数据日期
            String last_time = "";
            String today = "";
            String sql_time = "select max(c_date) last_time,  now()::date today from fgw.tb_s_data";
            rs_dt = stmt.executeQuery(sql_time);
            while (rs_dt.next()) {
                last_time = rs_dt.getString(1);
                today = rs_dt.getString(2);
            }
            try {
                if (rs_dt != null) rs_dt.close();
            }catch (SQLException e) {
                System.out.print(e.getMessage());
            }

            if (last_time.equals(today)) {
//                dataShop.setSuccess(false);
//                dataShop.setMessage("今日数据已经生成，不能重复生成！");
            } else {
                java.util.Date u_date = new java.util.Date();
                SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                String s_date = df.format(u_date);

                String sql_del = "delete from fgw.tb_s_data where c_date = '" + c_date + "'";
                stmt.executeUpdate(sql_del);

                String sql_int = "insert into fgw.tb_s_data(card_id, c_date, balance) " +
                        " select card_id, current_date c_date, 100 + round(random()*2) * 100 " +
                        " from fgw.tb_cust_info a order by random()";
                stmt.executeUpdate(sql_int);

                //查询现有表，更新账户信息
                String  sql_gl = "select a.card_id, a.c_date, a.balance, b.cust_nm from fgw.tb_s_data a, fgw.tb_cust_info b " +
                        "where a.card_id = b.card_id and a.c_date = '" + c_date + "' order by a.data_ser";
                rs_up_account = stmt.executeQuery(sql_gl);

                int i = 0, j = 1;
                String card1 = "", card2 = "", card3 = "";
                String cust1 = "", cust2 = "", cust3 = "";
                String final_card1 = "";
                String final_cust1 = "";
                String final_card2 = "";
                String final_cust2 = "";

                while (rs_up_account.next()) {
                    String in_account1 = rs_up_account.getString(1);
                    balance = rs_up_account.getInt(3);
                    String cust_nm_temp = rs_up_account.getString(4);
                    c_balance.put(in_account1, balance);
                    if (j == 1) {
                        card1 = in_account1;
                        cust1 = cust_nm_temp;
                    } else if (j == 2) {
                        card2 = in_account1;
                        cust2 = cust_nm_temp;
                    } else if (j == 3) {
                        card3 = in_account1;
                        cust3 = cust_nm_temp;
                        final_card2 = card3;
                        final_cust2 = cust3;

                        //设置第一张卡
//                        String sql_temp_1 = "update fgw.tb_s_data set in_account1 = '" + "(" + final_card1 + ")  " + final_cust1 +
//                                "', out_account1 = '" + "(" + final_card2 + ")  " + final_cust2 +
//                                "' where card_id = '" + card1 + "' and c_date = '" + c_date + "'";
//                        stmt.executeUpdate(sql_temp_1);

                        String sql_temp_1 = "update fgw.tb_s_data set in_account1 = '" + "(" + final_card1 + ")  " + final_cust1 +
                                "', out_account1 = '" + "(" + final_card2 + ")  " + final_cust2 +
                                "' where card_id = '" + card1 + "' and c_date = '" + c_date + "'";
                        pst = conn.prepareStatement(sql_temp_1);
                        pst.executeUpdate();


//
//                        //设置第二张卡
//                        sql_temp = "update fgw.tb_s_data set in_account1 = '" + "(" + final_card1 + ")  " + final_cust1 +
//                                "', out_account1 = '" + "(" + final_card2 + ")  " + final_cust2 +
//                                "' where card_id = '" + card2 + "' and c_date = '" + c_date + "'";
//                        stmt.executeUpdate(sql_temp);


                        String sql_temp_2 =  "update fgw.tb_s_data set in_account1 = '" + "(" + final_card1 + ")  " + final_cust1 +
                                "', out_account1 = '" + "(" + final_card2 + ")  " + final_cust2 +
                                "' where card_id = '" + card2 + "' and c_date = '" + c_date + "'";
                        pst = conn.prepareStatement(sql_temp_2);
                        pst.executeUpdate();
//
//                        //设置第三张卡
//                        sql_temp = "update fgw.tb_s_data set in_account1 = '" + "(" + card1 + ")  " + cust1 +
//                                "', in_account2 = '" + "(" + card2 + ")  " + cust2 +
//                                "' where card_id = '" + card3 + "' and c_date = '" + c_date + "'";
//                        stmt.executeUpdate(sql_temp);
                        String sql_temp_3 = "update fgw.tb_s_data set in_account1 = '" + "(" + card1 + ")  " + cust1 +
                                "', in_account2 = '" + "(" + card2 + ")  " + cust2 +
                                "' where card_id = '" + card3 + "' and c_date = '" + c_date + "'";
                        pst = conn.prepareStatement(sql_temp_3);
                        pst.executeUpdate();

                        if (i > 2) {
//                            sql_temp = "update fgw.tb_s_data set out_account1 = '" + "(" + card1 + ")  " + cust1 +
//                                    "', out_account2 = '" + "(" + card2 + ")  " + cust2 +
//                                    "' where card_id = '" + final_card1 + "' and c_date = '" + c_date + "'";
//                            stmt.executeUpdate(sql_temp);
                            String sql_temp_4 = "update fgw.tb_s_data set out_account1 = '" + "(" + card1 + ")  " + cust1 +
                                    "', out_account2 = '" + "(" + card2 + ")  " + cust2 +
                                    "' where card_id = '" + final_card1 + "' and c_date = '" + c_date + "'";
                            pst = conn.prepareStatement(sql_temp_4);
                            pst.executeUpdate();
                        }
//
                        j = 0;
                        final_card1 = final_card2;
                        final_cust1 = final_cust2;
                    }
                    i++;
                    j++;
                }
                try {
                    if (rs_up_account != null) rs_up_account.close();
                }catch (SQLException e) {
                    System.out.print(e.getMessage());
                }
                //初始化余额Map
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(new java.util.Date());
                int day = calendar.get(Calendar.DATE);
                calendar.set(Calendar.DATE, day - 1);
                String dayBefore = new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());
                String sql = "select * from fgw.tb_s_data where c_date = '" + last_time + "' order by data_ser;";
                rs_sel = stmt.executeQuery(sql);
                while (rs_sel.next()) {
                    b_balance.put(rs_sel.getString(1), rs_sel.getInt(3));
                }
                try {
                    if (rs_sel != null) rs_sel.close();
                }catch (SQLException e) {
                    System.out.print(e.getMessage());
                }


                //查询现有表，更新账户信息
                sql = "select * from fgw.tb_s_data where c_date = '" + c_date + "' order by data_ser;";
                rs_up_in = stmt.executeQuery(sql);

                //定义随机数，分配存入金额
                double r1 = 0;
                double r2 = 0;

                double o1;
                double o2;

                //重置i，j
                i = 0;
                j = 1;

                while (rs_up_in.next()) {
                    System.out.println(rs_up_in.getString(1));
                    String in_account1 = rs_up_in.getString(1);

                    if (j == 1) {
                        card1 = in_account1;
                    } else if (j == 2) {
                        card2 = in_account1;
                    } else if (j == 3) {
                        card3 = in_account1;
                        final_card2 = card3;


                        //确保随机数生成3~7之间的数字
                        long radom1 = 0;
                        while (true) {
                            radom1 = Math.round(Math.random() * 10);
                            if (radom1 >= 3 && radom1 <= 7) {
                                if (i < 3) {
                                    r1 = total_m * radom1 / 10.0;
                                    r2 = total_m - r1;
                                }
                                break;
                            }
                        }

                        o1 = (r1 + b_balance.get(card1) - c_balance.get(card1));
                        o2 = (r2 + b_balance.get(card2) - c_balance.get(card2));

                        //设置第一张卡
//                        String sql_temp = "update fgw.tb_s_data set in1 = " + r1 +
//                                ", out1 = " + o1 +
//                                " where card_id = '" + card1 + "' and c_date = '" + c_date + "'";
//                        stmt.executeUpdate(sql_temp);

                        String sql_temp_5 = "update fgw.tb_s_data set in1 = " + r1 +
                                ", out1 = " + o1 +
                                " where card_id = '" + card1 + "' and c_date = '" + c_date + "'";
                        pst = conn.prepareStatement(sql_temp_5);
                        pst.executeUpdate();
                        System.out.println("1");
                        System.out.println(sql_temp_5);
                        //设置第二张卡
//                        String sql_temp = "update fgw.tb_s_data set in1 = " + r2 +
//                                ", out1 = " + o2 +
//                                " where card_id = '" + card2 + "' and c_date = '" + c_date + "'";
//                        stmt.executeUpdate(sql_temp);

                        String sql_temp_6 = "update fgw.tb_s_data set in1 = " + r2 +
                                ", out1 = " + o2 +
                                " where card_id = '" + card2 + "' and c_date = '" + c_date + "'";
                        pst = conn.prepareStatement(sql_temp_6);
                        pst.executeUpdate();
                        System.out.println("2");
                        System.out.println(sql_temp_6);
                        //设置第三张卡
//                        sql_temp = "update fgw.tb_s_data set in1 = " + o1 +
//                                ", in2 = " + o2 +
//                                " where card_id = '" + card3 + "' and c_date = '" + c_date + "'";
//                        stmt.executeUpdate(sql_temp);

                        String sql_temp_7 = "update fgw.tb_s_data set in1 = " + o1 +
                                ", in2 = " + o2 +
                                " where card_id = '" + card3 + "' and c_date = '" + c_date + "'";
                        pst = conn.prepareStatement(sql_temp_7);
                        pst.executeUpdate();
                        System.out.println("3");
                        System.out.println(sql_temp_7);

                        //重新设置总金额
                        total_m = o1 + o2;// + b_balance.get(card3);
                        if (i >= 2) {

                            //确保随机数生成3~7之间的数字
                            long radom2 = 0;
                            while (true) {
                                radom2 = Math.round(Math.random() * 10);
                                if (radom2 >= 3 && radom2 <= 7) {
                                    r1 = total_m * radom2 / 10.0;
                                    r2 = total_m - r1;
                                    break;
                                }
                            }
                            double bb3 = b_balance.get(card3) / 2.0;
                            double bc3 = c_balance.get(card3) / 2.0;

                            double o11 = (r1 + bb3 - bc3);
                            double o21 = (r2 + bb3 - bc3);
//                            sql_temp = "update fgw.tb_s_data set out1 = " + o11 +
//                                    ", out2= " + o21 +
//                                    " where card_id = '" + final_card2 + "' and c_date = '" + c_date + "'";
//                            stmt.executeUpdate(sql_temp);

                            String sql_temp_8 = "update fgw.tb_s_data set out1 = " + o11 +
                                    ", out2= " + o21 +
                                    " where card_id = '" + final_card2 + "' and c_date = '" + c_date + "'";
                            pst = conn.prepareStatement(sql_temp_8);
                            pst.executeUpdate();
                            System.out.println("4");
                            System.out.println(sql_temp_8);

                            r1 = o11;
                            r2 = o21;

                        }

                        j = 0;
                        final_card1 = final_card2;
                    }
                    i++;
                    j++;
                }

                try {
                    if (rs_up_in != null) rs_up_in.close();
                }catch (SQLException e) {
                    System.out.print(e.getMessage());
                }

            }
            String sql_all = "SELECT a.id, a.cust_nm, a.card_id, b.c_date, b.balance, b.in1, b.in2, b.out1, b.out2, " +
                    "b.in_account1, b.in_account2, b.out_account1, b.out_account2 " +
                    " FROM fgw.tb_cust_info a, fgw.tb_s_data b " +
                    " WHERE a.card_id = b.card_id and c_date ='" + c_date + "'" +
                    " ORDER BY data_ser";
            rs_all = stmt.executeQuery(sql_all);
            list = new ConvertToList().convertList(rs_all);
        }catch (SQLException e){
            System.out.print(e.getMessage());
        }finally {
            try{
//                if (pst != null) pst.close();
                if (rs_all != null) rs_all.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            }catch (SQLException e){
                System.out.print(e.getMessage());
            }
        }

        dataShop.setSuccess(true);
        dataShop.setList(list);

        return dataShop;
    }
}