package com.backend.demo.repository;


import com.backend.demo.Entity.User;
import com.backend.demo.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByEmail(String Email);
    User findByRole(UserRole userRole);
}
