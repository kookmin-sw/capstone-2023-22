package sesohaeng.sesohaengbackend.domain.specialarea;

import org.springframework.data.annotation.TypeAlias;
import sesohaeng.sesohaengbackend.domain.feed.Feed;
import sesohaeng.sesohaengbackend.domain.place.Place;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "special_area")
public class SpecialArea {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String areaName;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    @OneToMany(mappedBy = "special_area", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Place> places = new ArrayList<>();
}
