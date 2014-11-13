package com.smart.dao;

import com.smart.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class UserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public int getMatchCount(String userName, String password) {
        String sqlStr = " SELECT count(*) FROM work.users "
                + " WHERE username =? and password=? ";
        return jdbcTemplate.queryForInt(sqlStr, new Object[]{userName, password});
    }

    public User findUserByUserName(final String userName) {
        String sqlStr = " SELECT id,username "
                + " FROM work.users WHERE username =? ";
        final User user = new User();
        jdbcTemplate.query(sqlStr, new Object[]{userName},
                new RowCallbackHandler() {
                    public void processRow(ResultSet rs) throws SQLException {
                        user.setId(rs.getInt("id"));
                        user.setUsername(userName);
                    }
                });
        return user;
    }

//    public void updateLoginInfo(User user) {
//        String sqlStr = " UPDATE work.users SET last_visit=?,last_ip=?"
//                + " WHERE id =?";
//        jdbcTemplate.update(sqlStr, new Object[]{user.getLastVisit(),
//                user.getLastIp(), user.getUserId()});
//    }
}
