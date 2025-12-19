package room911.soler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import room911.soler.entity.Access;

import java.util.List;

public interface AccessRepository extends JpaRepository<Access, Integer> {
    @Query("SELECT a FROM Access a WHERE a.identification = :id ORDER BY a.date DESC, a.hour DESC")
    List<Access> findByUser(@Param("id") Long id);
}
