package sesohaeng.sesohaengbackend.domain.bookmark;

import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.folder.Folder;
import sesohaeng.sesohaengbackend.domain.place.Place;

import javax.persistence.*;

@Entity
@Table(name = "BookMark")
@NoArgsConstructor
public class BookMark {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private Boolean isSaved;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;



}
