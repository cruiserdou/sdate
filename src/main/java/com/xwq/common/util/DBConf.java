package com.xwq.common.util;

/**
 * Created by xwq on 14-3-14.
 */
public class DBConf {
    private String url;
    private String port;
    private String user;
    private String password;
    private String driver_class;
    private String database;

    public String getDatabase() {
        return database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDriver_class() {
        return driver_class;
    }

    public void setDriver_class(String driver_class) {
        this.driver_class = driver_class;
    }
}
