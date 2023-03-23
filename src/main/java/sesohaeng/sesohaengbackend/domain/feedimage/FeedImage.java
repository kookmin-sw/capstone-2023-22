package sesohaeng.sesohaengbackend.domain.feedimage;


import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.feed.Feed;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "Feed_Image")
public class FeedImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;


}
