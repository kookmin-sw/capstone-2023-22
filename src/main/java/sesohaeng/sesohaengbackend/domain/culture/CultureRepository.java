package sesohaeng.sesohaengbackend.domain.culture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.place.Place;

import java.util.Optional;

@Repository
public interface CultureRepository extends JpaRepository<Culture,Long> {
    Optional<Culture> findByPlace(Place place);
}
