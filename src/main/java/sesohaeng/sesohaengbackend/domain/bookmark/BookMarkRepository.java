package sesohaeng.sesohaengbackend.domain.bookmark;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;

import java.util.List;

public interface BookMarkRepository extends JpaRepository<BookMark,Long> {

//    List<BookMark> findBy
}
