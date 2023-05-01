package sesohaeng.sesohaengbackend.domain.place;

import lombok.Getter;
import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.cafe.Cafe;
import sesohaeng.sesohaengbackend.domain.culture.Culture;
import sesohaeng.sesohaengbackend.domain.feed.Feed;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "PLACE")
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
    @JoinColumn(name = "area_id")
    private Area area;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Feed> feeds = new ArrayList<>();

    private Place(String placeName ,Double latitude, Double longitude, Area area){
        this.placeName = placeName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.area = area;
    }
    private Place(String placeName ){
        this.placeName = placeName;
    }

    public static final Place newTestInstance(String placeName ,Double latitude, Double longitude, Area area) {
        return new Place(placeName,latitude,longitude,area);
    }
    public static final Place newTestInstance(String placeName) {
        return new Place(placeName);
    }
}
