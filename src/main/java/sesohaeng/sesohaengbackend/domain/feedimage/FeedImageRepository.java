package sesohaeng.sesohaengbackend.domain.feedimage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sesohaeng.sesohaengbackend.domain.area.Area;

@Repository
public interface FeedImageRepository extends JpaRepository<FeedImage,Long> {
}
