package sesohaeng.sesohaengbackend.domain.place;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.area.AreaRepository;
import sesohaeng.sesohaengbackend.domain.cafe.Cafe;
import sesohaeng.sesohaengbackend.domain.culture.Culture;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place,Long> {

    List<Place> findAllByArea(Area area);

}
