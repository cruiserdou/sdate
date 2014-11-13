package com.xwq.common.model;

import org.postgresql.util.PGobject;

import java.util.List;

/**
 * Created by xwq on 14-4-15.
 */
public class DataShop {
    boolean success;
    String name;
    String message;
    List list;
    PGobject pGobject;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public PGobject getpGobject() {
        return pGobject;
    }

    public void setpGobject(PGobject pGobject) {
        this.pGobject = pGobject;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }
}