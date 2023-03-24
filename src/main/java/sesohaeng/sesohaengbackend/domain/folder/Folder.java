package sesohaeng.sesohaengbackend.domain.folder;


import lombok.NoArgsConstructor;
import sesohaeng.sesohaengbackend.domain.bookmark.BookMark;
import sesohaeng.sesohaengbackend.domain.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "folder")
@NoArgsConstructor
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String folderName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "folder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookMark> bookMarks = new ArrayList<>();
}
