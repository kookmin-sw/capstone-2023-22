package sesohaeng.sesohaengbackend.domain.culture;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;

public interface CultureRepository extends JpaRepository<Culture,Long> {
}
