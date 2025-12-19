package room911.soler.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import room911.soler.dto.DepartmentRequest;
import room911.soler.entity.Department;
import room911.soler.service.DepartmentService;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @PostMapping
    public Department create(@RequestBody DepartmentRequest request) {
        return departmentService.create(request);
    }

    @GetMapping
    public List<Department> findAll() {
        return departmentService.findAll();
    }

    @GetMapping("/{id}")
    public Department findById(@PathVariable Integer id) {
        return departmentService.findById(id);
    }

    @PutMapping("/{id}")
    public Department update(
            @PathVariable Integer id,
            @RequestBody DepartmentRequest request
    ) {
        return departmentService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        departmentService.delete(id);
    }
}
