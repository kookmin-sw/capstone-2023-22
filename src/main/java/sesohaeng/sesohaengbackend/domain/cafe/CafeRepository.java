package sesohaeng.sesohaengbackend.domain.cafe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.culture.Culture;
import sesohaeng.sesohaengbackend.domain.place.Place;

import java.util.Optional;
@Repository
public interface CafeRepository extends JpaRepository<Cafe,Long> {


    Optional<Cafe> findByPlace(Place place);
}
