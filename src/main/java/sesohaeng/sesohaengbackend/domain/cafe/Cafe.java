package sesohaeng.sesohaengbackend.domain.cafe;

import lombok.Getter;
import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.place.Place;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "CAFE")
public class Cafe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String cafe_name;

    @Column
    private String address;

    @OneToOne(fetch = FetchType.LAZY)
    private Place place;
}
