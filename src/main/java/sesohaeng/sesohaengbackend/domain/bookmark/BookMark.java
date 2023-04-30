package sesohaeng.sesohaengbackend.domain.bookmark;

import lombok.Getter;
import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.BaseTimeEntity;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.user.User;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "BOOKMARK")
public class BookMark extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private Boolean isSaved;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    private BookMark(Boolean isSaved, User user, Place place){
        this.isSaved = isSaved;
        this.user = user;
        this.place = place;
    }

    public static final BookMark newInstance(Boolean isSaved, User user, Place place){
        return new BookMark(isSaved,user,place);
    }

    public static final void deleteBookMark(BookMark bookMark){
        bookMark.isSaved = false;
    }
}
