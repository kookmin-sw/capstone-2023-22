package sesohaeng.sesohaengbackend.domain.heart;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.feed.Feed;
import sesohaeng.sesohaengbackend.domain.user.User;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "HEART")
public class Heart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;

    public Heart(User user, Feed feed) {
        this.user = user;
        this.feed = feed;
    }

    public static final Heart newInstance(User user, Feed feed) {
        return new Heart(user, feed);
    }
}
