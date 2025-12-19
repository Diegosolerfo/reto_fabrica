package room911.soler.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name = "identificationnumber")
    private Long identificationNumber;

    @Column(name = "usertype")
    private String usertype;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "iddepartment")
    private Integer idDepartment;

    @Column(name = "password_")
    private String password;

    @Column(name = "allow")
    private Boolean allow;
}