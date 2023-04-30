package sesohaeng.sesohaengbackend.service.bookmark;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sesohaeng.sesohaengbackend.domain.bookmark.BookMark;
import sesohaeng.sesohaengbackend.domain.bookmark.BookMarkRepository;
import sesohaeng.sesohaengbackend.domain.cafe.Cafe;
import sesohaeng.sesohaengbackend.domain.cafe.CafeRepository;
import sesohaeng.sesohaengbackend.domain.culture.Culture;
import sesohaeng.sesohaengbackend.domain.culture.CultureRepository;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookmarkResponseDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookMarkServiceImpl implements BookMarkService {
    private final BookMarkRepository bookMarkRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    private final CafeRepository cafeRepository;
    private final CultureRepository cultureRepository;


    @Transactional
    @Override
    public void bookMarked(Long userId, Long id) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoDataException("해당 유저가 존재하지 않습니다. 회원가입 해주세요"));
        List<BookMark> bookMarks = bookMarkRepository.findByUser(user);
        // 카페인지 컬쳐인지 검증
        Optional<Culture> culture = cultureRepository.findById(id);
        Optional<Cafe> cafe = cafeRepository.findById(id);
        String value = judgeCafeOrCulture(cafe, culture);
        if(value.equals("Cafe")){
            placeRepository.
        }

    }


    @Transactional
    @Override
    public List<BookmarkResponseDto> getBookMarks(Long userId) {
        return null;
    }

    private String judgeCafeOrCulture(Optional<Cafe> cafe, Optional<Culture> culture) {
        if (cafe.isPresent() && culture.isEmpty()) {
            return "Cafe";
        }else if (cafe.isEmpty() && culture.isPresent()){
            return "Culture";
        }
        return "Unavailable";
    }
}