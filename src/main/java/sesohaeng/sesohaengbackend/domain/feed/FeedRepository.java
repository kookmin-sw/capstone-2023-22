package sesohaeng.sesohaengbackend.domain.feed;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedRepository extends JpaRepository<Feed,Long> {
    Feed save(Feed feed);
    Optional<Feed> findById(Long id);
    @Override
    void deleteById(Long id);
}
