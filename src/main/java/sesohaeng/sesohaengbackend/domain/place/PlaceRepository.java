package sesohaeng.sesohaengbackend.domain.place;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;

public interface PlaceRepository extends JpaRepository<Place,Long> {
}
