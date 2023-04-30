package sesohaeng.sesohaengbackend.domain.like;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sesohaeng.sesohaengbackend.domain.area.Area;

@Repository
public interface LikeRepository extends JpaRepository<Like,Long> {
}
