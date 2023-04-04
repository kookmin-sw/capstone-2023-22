package sesohaeng.sesohaengbackend.service.bookmark;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sesohaeng.sesohaengbackend.domain.bookmark.BookMarkRepository;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookmarkResponseDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class PlaceService {
    private PlaceRepository placeRepository;
    private BookMarkRepository bookMarkRepository;

    private UserRepository userRepository;


    @Transactional
    public List<BookmarkResponseDto> getBookmarks(CustomUserDetails user){
        User findUser = userRepository.findById(Long.valueOf(user.getName()))
                .orElseThrow(NoDataException::new);
//        bookMarkRepository.findBy
        return null;
    }
}
