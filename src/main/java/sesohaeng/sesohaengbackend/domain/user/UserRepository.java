package sesohaeng.sesohaengbackend.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;

public interface UserRepository extends JpaRepository<User,Long> {
}
