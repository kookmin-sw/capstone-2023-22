package sesohaeng.sesohaengbackend.domain.folder;

import org.springframework.data.jpa.repository.JpaRepository;
import sesohaeng.sesohaengbackend.domain.area.Area;

public interface FolderRepository extends JpaRepository<Folder,Long> {
}
