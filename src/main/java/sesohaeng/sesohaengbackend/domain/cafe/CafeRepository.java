package sesohaeng.sesohaengbackend.domain.cafe;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;

public interface CafeRepository extends JpaRepository<Cafe,Long> {
}
