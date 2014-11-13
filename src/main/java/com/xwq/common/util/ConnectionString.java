//package com.xwq.common.util;
//
///**
// * Created by Administrator on 13-12-18.
// */
//
//import com.google.gson.Gson;
//import org.apache.struts2.ServletActionContext;
//
//import javax.servlet.http.HttpServletRequest;
//import java.io.BufferedReader;
//import java.io.File;
//import java.io.FileReader;
//import java.io.IOException;
//
//public class ConnectionString {
//    String url;
//    String user;
//    String password;
//
//    public DBConf getDBConf(String path) {
//        DBConf dbConf = new DBConf();
//        String sets = readFile(path);
//        Gson gson = new Gson();
//        dbConf = gson.fromJson(sets, DBConf.class);
//
//        return dbConf;
//    }
//
//    public String readFile(String path) {
//        File file = new File(path);
//        BufferedReader reader = null;
//        String lastStr = "";
//
//        try {
//            reader = new BufferedReader(new FileReader(file));
//            String tempString = null;
//
//            //每次读取一行，直到读入null为文件结束
//            while ((tempString = reader.readLine()) != null) {
//                lastStr = lastStr + tempString;
//            }
//
//            reader.close();
//        } catch (IOException e) {
//            e.printStackTrace();
//        } finally {
//            if (reader != null)
//                try {
//                    reader.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//        }
//
//        return lastStr;
//    }
//
//    public ConnectionString() {
//        HttpServletRequest request = ServletActionContext.getRequest();
//
//        String projectPath = request.getSession().getServletContext().getRealPath("/data");
//
////        DBConf dbConf = getDBConf(projectPath + "/db.json");
////        System.out.println(projectPath + "/db.json");
////        url = "jdbc:postgresql://" + dbConf.getUrl() + ":" + dbConf.getPort() + "/" + dbConf.getDatabase();
//        url = "jdbc:postgresql://localhost:5432/test";
////        url = "jdbc:postgresql://localhost:5432/chinamobile";
//        user = "postgres";
//        password = "postgres";
////        user = dbConf.getUser();
////
////        password = dbConf.getPassword();
//    }
//
//    public String getUrl() {
//        return url;
//    }
//
//    public String getUser() {
//        return user;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//}
