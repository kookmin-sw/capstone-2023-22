package sesohaeng.sesohaengbackend.domain.feedimage;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.feed.Feed;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "FEED_IMAGE")
public class FeedImage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String imageUrl;

    @JsonBackReference
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;

    private FeedImage(String imageUrl, Feed feed) {
        this.imageUrl = imageUrl;
        this.feed = feed;
    }

    public static final FeedImage newInstance(String imageUrl, Feed feed) {
        return new FeedImage(imageUrl, feed);
    }
}
