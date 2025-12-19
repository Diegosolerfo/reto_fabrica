package room911.soler.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import room911.soler.dto.DepartmentRequest;
import room911.soler.entity.Department;
import room911.soler.repository.DepartmentRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    // CREATE
    public Department create(DepartmentRequest request) {
        Department department = new Department();
        department.setName(request.getName());
        department.setDescription(request.getDescription());
        return departmentRepository.save(department);
    }

    // READ ALL
    public List<Department> findAll() {
        return departmentRepository.findAll();
    }

    // READ ONE
    public Department findById(Integer id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Departamento no encontrado"));
    }

    // UPDATE
    public Department update(Integer id, DepartmentRequest request) {
        Department department = findById(id);
        department.setName(request.getName());
        department.setDescription(request.getDescription());
        return departmentRepository.save(department);
    }

    // DELETE
    public void delete(Integer id) {
        departmentRepository.deleteById(id);
    }
}
