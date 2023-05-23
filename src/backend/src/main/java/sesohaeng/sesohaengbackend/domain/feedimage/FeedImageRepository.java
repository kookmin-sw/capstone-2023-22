package sesohaeng.sesohaengbackend.domain.feedimage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sesohaeng.sesohaengbackend.domain.feed.Feed;

@Repository
public interface FeedImageRepository extends JpaRepository<FeedImage,Long> {
    FeedImage findByFeed(Feed feed);
}
