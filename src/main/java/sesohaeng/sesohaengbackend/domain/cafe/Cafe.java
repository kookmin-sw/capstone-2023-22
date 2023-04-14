package sesohaeng.sesohaengbackend.domain.cafe;


import lombok.Getter;
import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.area.Area;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_id")
    private Area area;

    @OneToOne(fetch = FetchType.LAZY)
    private Place place;
}