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

    @Column(name = "date_")
    private LocalDate date;

    @Column(name = "hour_")
    private LocalTime hour;

    @Column(name = "identification")
    private Long identification;

    @PrePersist
    public void prePersist() {
        if (this.date == null) {
            this.date = LocalDate.now();
        }
        if (this.hour == null) {
            this.hour = LocalTime.now();
        }
    }
}
