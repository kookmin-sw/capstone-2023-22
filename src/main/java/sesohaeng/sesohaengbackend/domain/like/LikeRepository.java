package sesohaeng.sesohaengbackend.domain.like;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like,Long> {
    int countByFeedId(Long feedId);
}
