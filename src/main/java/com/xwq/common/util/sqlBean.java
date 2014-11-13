package com.xwq.common.util;

import java.sql.*;

public class sqlBean {

    public Connection conn = null;

    public ResultSet rs = null;

    private String DatabaseDriver = "org.postgresql.Driver";
    //DataSource ����Դ����DSN
    private String DatabaseConnStr = "jdbc:postgresql://localhost:5432/exam";


    //���巽��
/*setXxx������������ֵ;getXxx���ڵõ�����ֵ*/
    public void setDatabaseDriver(String Driver){
        this.DatabaseDriver=Driver;
    }
    public String getDatabaseDriver(){
        return (this.DatabaseDriver);
    }

    public void setDatabaseConnStr(String ConnStr) {
        this.DatabaseConnStr = ConnStr;
    }

    public String getDatabaseConnStr() {
        return (this.DatabaseConnStr);
    }

    public sqlBean() {
//        try {
//            Class.forName("org.postgresql.Driver");
//        } catch (ClassNotFoundException e) {
//            System.err.println("加载驱动器有错误:"+e.getMessage( ));
//            System.out.print("加载驱动器有错误:"+e.getMessage());
//        }

        try {
            Class.forName("org.postgresql.Driver").newInstance();
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }
    }


    public int executeInsert(String sql) {
        int num = 0;
        try {
            conn = DriverManager.getConnection(DatabaseConnStr, "postgres", "postgres");
            Statement stmt = conn.createStatement();
            num = stmt.executeUpdate(sql);
        } catch (SQLException ex) {
            System.err.println("执行插入有错误:"+ex.getMessage() );
            System.out.print("执行插入有错误:"+ex.getMessage());//������ͻ���
        }

        CloseDataBase();
        return num;
    }
// display data 

    public ResultSet executeQuery(String sql) {
        rs = null;
        try {
            conn = DriverManager.getConnection(DatabaseConnStr, "postgres", "postgres");
            Statement stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
        } catch (SQLException ex) {
            System.err.println("执行查询有错误:"+ex.getMessage() );
            System.out.print("执行查询有错误:"+ex.getMessage()); //������ͻ���
        }

        return rs;
    }

    // delete data
    public int executeDelete(String sql) {
        int num = 0;
        try {

            conn = DriverManager.getConnection(DatabaseConnStr, "postgres", "postgres");
            Statement stmt = conn.createStatement();
            num = stmt.executeUpdate(sql);
        } catch (SQLException ex) {
            System.err.println("执行删除有错误:"+ex.getMessage() );
            System.out.print("执行删除有错误:"+ex.getMessage());  //������ͻ���
        }
        CloseDataBase();
        return num;
    }

    //////////////////
    public void CloseDataBase() {
        try {
            conn.close();
        } catch (Exception end) {
            System.err.println("执行关闭Connection对象有错误："+end.getMessage( ) );
            System.out.print("执行执行关闭Connection对象有错误：有错误:"+end.getMessage()); //������ͻ���
        }
    }
}
