package sesohaeng.sesohaengbackend.domain.feed;

import sesohaeng.sesohaengbackend.domain.BaseTimeEntity;
import sesohaeng.sesohaengbackend.domain.like.Like;
import sesohaeng.sesohaengbackend.domain.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "feed")
public class Feed extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String placeName;

    @Column
    private String placeImage;

    @Column
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Like> likes = new ArrayList<>();


}
