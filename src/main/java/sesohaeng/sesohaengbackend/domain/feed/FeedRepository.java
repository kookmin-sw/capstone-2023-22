package sesohaeng.sesohaengbackend.domain.feed;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.user.User;

import java.util.List;
import java.util.Optional;

public interface FeedRepository extends JpaRepository<Feed,Long> {
    Feed save(Feed feed);
    Optional<Feed> findById(Long id);
    List<Feed> findAll();
    List<Feed> findByUser(User user);
    @Override
    void deleteById(Long id);
}
