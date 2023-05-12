package sesohaeng.sesohaengbackend.domain.heart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeartRepository extends JpaRepository<Heart,Long> {
    int countByFeedId(Long feedId);
}
