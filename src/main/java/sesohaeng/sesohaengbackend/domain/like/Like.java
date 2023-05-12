package sesohaeng.sesohaengbackend.domain.like;

import lombok.Getter;
import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.feed.Feed;
import sesohaeng.sesohaengbackend.domain.user.User;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "LIKE")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;

    public Like(User user, Feed feed) {
        this.user = user;
        this.feed = feed;
    }

    public static final Like newInstance(User user, Feed feed) {
        return new Like(user, feed);
    }
}
