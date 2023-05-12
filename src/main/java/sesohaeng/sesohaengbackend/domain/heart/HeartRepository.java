package sesohaeng.sesohaengbackend.domain.heart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sesohaeng.sesohaengbackend.domain.feed.Feed;
import sesohaeng.sesohaengbackend.domain.user.User;

@Repository
public interface HeartRepository extends JpaRepository<Heart,Long> {
    int countByFeedId(Long feedId);

    int deleteByFeedAndUser(Feed feed, User user);
}
