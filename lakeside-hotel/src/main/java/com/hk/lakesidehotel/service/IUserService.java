package com.hk.lakesidehotel.service;

import com.hk.lakesidehotel.dto.request.RegisterRequest;
import com.hk.lakesidehotel.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(RegisterRequest request);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}
