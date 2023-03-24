package sesohaeng.sesohaengbackend.domain.bookmark;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;

public interface BookMarkRepository extends JpaRepository<BookMark,Long> {
}
