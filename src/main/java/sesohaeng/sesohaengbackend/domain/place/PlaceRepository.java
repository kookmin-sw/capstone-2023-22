package sesohaeng.sesohaengbackend.domain.place;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.cafe.Cafe;
import sesohaeng.sesohaengbackend.domain.culture.Culture;

public interface PlaceRepository extends JpaRepository<Place,Long> {
    Place findByPlaceName(String placeName);
}
