package sesohaeng.sesohaengbackend.domain.place;


import sesohaeng.sesohaengbackend.domain.savedplace.SavedPlace;
import sesohaeng.sesohaengbackend.domain.specialarea.Area;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "place")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String placeName;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialarea_id")
    private Area area;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SavedPlace> savedPlaces = new ArrayList<>();

}
