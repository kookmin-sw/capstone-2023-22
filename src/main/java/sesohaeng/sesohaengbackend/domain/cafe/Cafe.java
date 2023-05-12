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

    @OneToOne
    @JoinColumn(name = "place_id")
    private Place place;


    private Cafe(String cafeName, Place place){
        this.cafe_name = cafeName;
        this.place = place;
    }
    private Cafe(Long cafeId,String cafeName, Place place){
        this.id = cafeId;
        this.cafe_name = cafeName;
        this.place = place;
    }

    public final static Cafe newTestInstance(String cafeName, Place place){
        return new Cafe(cafeName,place);
    }

    public final static Cafe newTestInstance(Long cafeId, String cafeName, Place place){
        return new Cafe(cafeId,cafeName,place);
    }

}
