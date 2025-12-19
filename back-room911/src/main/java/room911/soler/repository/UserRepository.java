package room911.soler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import room911.soler.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByIdentificationNumber(Long identificationNumber);
    Page<User> findAll(Pageable pageable);
}
