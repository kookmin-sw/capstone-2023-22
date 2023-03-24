package sesohaeng.sesohaengbackend.domain.like;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;

public interface LikeRepository extends JpaRepository<Like,Long> {
}
