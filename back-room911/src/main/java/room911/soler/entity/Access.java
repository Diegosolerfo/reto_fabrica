package room911.soler.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "access_")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Access {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idaccess")
    private Integer idAccess;

    @Column(name = "date_",insertable = false, updatable = false)
    private LocalDate date;

    @Column(name = "hour_",insertable = false, updatable = false)
    private LocalTime hour;

    @Column(name = "identification")
    private Long identification;
}
