package sesohaeng.sesohaengbackend.domain.area;

import lombok.Getter;
import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.place.Place;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "AREA")
public class Area {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String areaName;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    @OneToMany(mappedBy = "area", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Place> places = new ArrayList<>();
}
