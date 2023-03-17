package sesohaeng.sesohaengbackend.domain.feed;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;

public interface FeedRepository extends JpaRepository<Feed,Long> {
}
