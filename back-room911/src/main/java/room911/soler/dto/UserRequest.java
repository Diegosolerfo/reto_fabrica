package room911.soler.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

    private Long identificationNumber;
    private String usertype;
    private String firstName;
    private String lastName;
    private Integer idDepartment;
    private String password;
    private Boolean allow;
}
