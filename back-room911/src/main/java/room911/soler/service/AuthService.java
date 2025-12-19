package room911.soler.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import room911.soler.dto.LoginResponse;
import room911.soler.entity.Access;
import room911.soler.entity.User;
import room911.soler.repository.AccessRepository;
import room911.soler.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AccessRepository accessRepository;

    public LoginResponse login(Long identificationNumber, String password) {

        User user = userRepository.findByIdentificationNumber(identificationNumber)
                .orElseThrow(() -> new RuntimeException("Usuario no existe"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        if (!Boolean.TRUE.equals(user.getAllow())) {
            throw new RuntimeException("Usuario no autorizado");
        }

        Access access = new Access();
        access.setIdentification(user.getIdentificationNumber());
        access.setDate(LocalDate.now());
        access.setHour(LocalTime.now());
        accessRepository.save(access);

        if ("admin_room_911".equalsIgnoreCase(user.getUsertype())) {
            return new LoginResponse(
                    true,
                    "Ingreso correcto - Administrador",
                    "ADMIN",
                    user.getIdentificationNumber()
            );
        } else {
            return new LoginResponse(
                    true,
                    "Ingreso correcto",
                    "EMPLEADO",
                    user.getIdentificationNumber()
            );
        }
    }
}
