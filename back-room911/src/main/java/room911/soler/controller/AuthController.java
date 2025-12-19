package room911.soler.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import room911.soler.dto.LoginRequest;
import room911.soler.dto.LoginResponse;
import room911.soler.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(
                request.getIdentificationNumber(),
                request.getPassword()
        );
    }
}
