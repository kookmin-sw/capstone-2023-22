package sesohaeng.sesohaengbackend.domain.culture;


import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.place.Place;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "Culture")
@NoArgsConstructor
public class Culture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String classification;

    @Column
    private String borough;

    @Column
    private String cultureName;

    @Column
    private LocalDateTime cultureDatetime;

    @Column(name = "place")
    private String placeName;

    @Column
    private String targetUser;

    @Column
    private String fee;

    @Column
    private String cast;

    @Column
    private String culture_url;

    @Column
    @Nullable
    private String cultureImage;

    @Column
    private Date applicationDate;

    @Column
    private LocalDateTime startDatetime;

    @Column
    private LocalDateTime endDatetime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_id")
    private Area area;

    @OneToOne(fetch = FetchType.LAZY)
    private Place place;




}
