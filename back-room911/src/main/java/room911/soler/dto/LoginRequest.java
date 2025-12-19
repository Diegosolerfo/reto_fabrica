package room911.soler.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private Long identificationNumber;
    private String password;
}
