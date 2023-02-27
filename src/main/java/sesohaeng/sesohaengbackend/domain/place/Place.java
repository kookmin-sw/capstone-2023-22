package sesohaeng.sesohaengbackend.domain.place;

import sesohaeng.sesohaengbackend.domain.folder.Folder;
import sesohaeng.sesohaengbackend.domain.savedplace.SavedPlace;
import sesohaeng.sesohaengbackend.domain.specialarea.SpecialArea;
import sesohaeng.sesohaengbackend.domain.user.User;

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
    @JoinColumn(name = "special_area_id")
    private SpecialArea specialArea;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SavedPlace> savedPlaces = new ArrayList<>();

}
