package sesohaeng.sesohaengbackend.domain.area;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import sesohaeng.sesohaengbackend.domain.feed.Feed;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.user.User;

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

    private Area(String areaName,Double latitude, Double longitude){
        this.areaName = areaName;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    private Area(Long id, String areaName,Double latitude, Double longitude){
        this.id = id;
        this.areaName = areaName;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public static final Area newInstance(String areaName,Double latitude, Double longitude) {
        return new Area(areaName,latitude,longitude);
    }
    public static final Area newTestInstance(Long id, String areaName,Double latitude, Double longitude) {
        return new Area(id,areaName,latitude,longitude);
    }
}
