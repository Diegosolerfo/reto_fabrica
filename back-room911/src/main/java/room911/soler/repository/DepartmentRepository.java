package room911.soler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import room911.soler.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer>
 {
}
