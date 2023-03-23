package sesohaeng.sesohaengbackend.domain.area;

import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.place.Place;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "area")
@NoArgsConstructor
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

}
