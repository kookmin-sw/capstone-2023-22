package sesohaeng.sesohaengbackend.domain.feed;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.BaseTimeEntity;
import sesohaeng.sesohaengbackend.domain.feedimage.FeedImage;
import sesohaeng.sesohaengbackend.domain.heart.Heart;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "FEED")
public class Feed extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String content;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    @JsonManagedReference
    @OneToOne(mappedBy = "feed", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private FeedImage image;

    @JsonManagedReference
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Heart> hearts = new ArrayList<>();

    private Feed(String content, User user, Place place) {
        this.content = content;
        this.user = user;
        this.place = place;
    }

    public static final Feed newInstance(String content, User user, Place place) {
        return new Feed(content, user, place);
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setPlace(Place place) { this.place = place; }
}
