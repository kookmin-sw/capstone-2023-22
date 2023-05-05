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
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookMarkDeleteResponseDto;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookMarkPostResponseDto;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookmarkResponseDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;

import java.util.LinkedList;
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
    public BookMarkPostResponseDto bookMarked(Long userId, Long id, String type) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoDataException("해당 유저가 존재하지 않습니다. 회원가입 해주세요"));
        return getBookMarkPostResponseDto(id, type, user);
    }


    @Transactional
    @Override
    public BookMarkDeleteResponseDto deleteBookMark(Long id) {
        BookMark bookMark = bookMarkRepository.findById(id).orElseThrow(() -> new NoDataException("해당 북마크가 존재하지 않습니다."));
        BookMark.deleteBookMark(bookMark);
        return new BookMarkDeleteResponseDto("해당 북마크가 삭제되었습니다.");
    }


    @Transactional
    @Override
    public List<BookmarkResponseDto> getBookMarks(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoDataException("해당 유저가 없습니다. 회원가입 해주세요"));
        List<BookmarkResponseDto> bookmarkResponseDtos = new LinkedList<>();
        List<BookMark> BookMarks = bookMarkRepository.findAllByUser(user);
        BookMarks.forEach(bookMark -> {
            bookmarkResponseDtos.add(new BookmarkResponseDto(bookMark.getId(), bookMark.getPlace().getId(), bookMark.getPlace().getPlaceName()));
        });
        return bookmarkResponseDtos;
    }



    private BookMarkPostResponseDto getBookMarkPostResponseDto(Long id, String type, User user) {
        if (type.equals("culture")) {
            Culture culture = cultureRepository.findById(id).orElseThrow(() -> new NoDataException("해당 문화 공간이 존재하지 않습니다."));
            BookMark saveBookMark = bookMarkRepository.save(BookMark.newInstance(true, user, culture.getPlace()));
            return new BookMarkPostResponseDto(
                    saveBookMark.getId(),
                    saveBookMark.getPlace().getPlaceName(),
                    saveBookMark.getCreatedAt()
            );
        } else if(type.equals("cafe")){
            Cafe cafe = cafeRepository.findById(id).orElseThrow(() -> new NoDataException("해당 카페가 존재하지 않습니다."));
            BookMark saveBookMark = bookMarkRepository.save(BookMark.newInstance(true, user, cafe.getPlace()));
            return new BookMarkPostResponseDto(
                    saveBookMark.getId(),
                    saveBookMark.getPlace().getPlaceName(),
                    saveBookMark.getCreatedAt()
            );
        }else{
            throw new NoDataException("해당 문화공간이나 카페가 존재하지 않습니다.");
        }
    }
}