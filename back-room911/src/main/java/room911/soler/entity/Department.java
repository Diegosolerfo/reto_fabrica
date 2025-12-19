package room911.soler.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "department")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDepartment;

    @Column(name = "name_", nullable = false, length = 40)
    private String name;

    @Column(name = "description", nullable = false, length = 100)
    private String description;
}
