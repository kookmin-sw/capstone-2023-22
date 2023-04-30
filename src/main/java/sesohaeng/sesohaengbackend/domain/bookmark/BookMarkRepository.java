package sesohaeng.sesohaengbackend.domain.bookmark;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.user.User;

import javax.swing.text.html.Option;
import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookMarkRepository extends JpaRepository<BookMark,Long> {

    BookMark save(BookMark bookMark);

    @Query("select b from BookMark b where b.isSaved = true and b.user= :user")
    List<BookMark> findAllByUser(User user);
//    List<BookMark> findBy
}
