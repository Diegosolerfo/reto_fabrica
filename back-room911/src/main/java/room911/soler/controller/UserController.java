package room911.soler.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import room911.soler.dto.UserRequest;
import room911.soler.entity.User;
import room911.soler.service.UserService;

import java.util.List;
import org.springframework.data.domain.Page;
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public User create(@RequestBody UserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping
    public List<User> getAll() {
        return userService.getAllUsers();
    }
    @GetMapping("/page")
    public Page<User> getUsersPage(
            @RequestParam int page,
            @RequestParam int size
    ) {
        return userService.getUsersPage(page, size);
    }
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id,
                       @RequestBody UserRequest request) {
        return userService.updateUser(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/import/csv")
    public ResponseEntity<String> importCSV(@RequestParam("file") MultipartFile file) {
        try {
            userService.importUsersFromCSV(file);
            return ResponseEntity.ok("Usuarios importados desde CSV");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al importar CSV: " + e.getMessage());
        }
    }

    @PostMapping("/import/excel")
    public ResponseEntity<String> importExcel(@RequestParam("file") MultipartFile file) {
        try {
            userService.importUsersFromExcel(file);
            return ResponseEntity.ok("Usuarios importados desde Excel");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al importar Excel");
        }
    }

}
