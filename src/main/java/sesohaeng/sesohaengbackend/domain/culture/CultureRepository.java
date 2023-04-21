package sesohaeng.sesohaengbackend.domain.culture;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.place.Place;

import java.util.Optional;

public interface CultureRepository extends JpaRepository<Culture,Long> {
    Optional<Culture> findByPlace(Place place);
}
