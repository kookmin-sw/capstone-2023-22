package sesohaeng.sesohaengbackend.service.bookmark;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sesohaeng.sesohaengbackend.domain.bookmark.BookMark;
import sesohaeng.sesohaengbackend.domain.bookmark.BookMarkRepository;
import sesohaeng.sesohaengbackend.domain.cafe.Cafe;
import sesohaeng.sesohaengbackend.domain.cafe.CafeRepository;
import sesohaeng.sesohaengbackend.domain.culture.Culture;
import sesohaeng.sesohaengbackend.domain.culture.CultureRepository;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookMarkPostResponseDto;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@Slf4j
@ExtendWith(MockitoExtension.class)
class BookMarkServiceTest {

    @InjectMocks
    BookMarkServiceImpl bookMarkService;

    @Mock
    BookMarkRepository bookMarkRepository;
    @Mock
    UserRepository userRepository;
    @Mock
    PlaceRepository placeRepository;
    @Mock
    CafeRepository cafeRepository;
    @Mock
    CultureRepository cultureRepository;

    // User
    Long userId;

    String email;

    // Culture
    Long cultureId;

    Place culturePlace;
    String cultureName;

    // Cafe
    Long cafeId;
    Place cafePlace;
    String cafeName;

    // BookMark
    Boolean isMarked;


    @BeforeEach
    void init(){
        userId = 10L;
        email ="seyeol@gmail.com";

        cultureId = 20L;
        culturePlace = Place.newTestInstance("culturePlace");
        cultureName = "공원";

        cafeId = 30L;
        cafePlace = Place.newTestInstance("cafePlace");
        cafeName = "카페";

        isMarked = true;

    }




    @DisplayName("컬쳐 북마크 생성")
//    @Test
    void cultureBookMarked() {
        // given
        User user = User.newTestInstance(userId, email);
        Optional<User> opUser= Optional.of(user);
        Culture culture = Culture.newTestInstance(cultureId, cultureName, culturePlace);
        Optional<Culture> opCulture= Optional.of(culture);
        Cafe cafe = Cafe.newTestInstance(cafeId,cafeName,cafePlace);
        Optional<Cafe> opCafe= Optional.of(cafe);
        BookMark bookMark = BookMark.newTestInstance(isMarked,user,culturePlace);

        // 스터빙은 호출이 안되면 불필요하다고 판단한다.
        when(userRepository.findById(anyLong())).thenReturn(opUser);
        when(cultureRepository.findById(anyLong())).thenReturn(opCulture);
//        when(cafeRepository.findById(anyLong())).thenReturn(opCafe);
        // bookmark의 place를 바꿔가며 확인 바람
        when(bookMarkRepository.save(any(BookMark.class))).thenReturn(bookMark);

        // when
//        BookMarkPostResponseDto bookMarkPostResponseDto = bookMarkService.bookMarked(userId, cultureId, "culture");
//        BookMarkPostResponseDto bookMarkPostResponseDto2 = bookMarkService.bookMarked(userId, cafeId, "cafe");

        // then
//        assertThat(bookMarkPostResponseDto.getPlaceName()).isEqualTo("culturePlace");
//        assertThat(bookMarkPostResponseDto2.getPlaceName()).isEqualTo("cafePlace");


    }
    @DisplayName("카페 북마크 생성")
//    @Test
    void cafeBookMarked() {
        // given
        User user = User.newTestInstance(userId, email);
        Optional<User> opUser= Optional.of(user);
        Culture culture = Culture.newTestInstance(cultureId, cultureName, culturePlace);
        Optional<Culture> opCulture= Optional.of(culture);
        Cafe cafe = Cafe.newTestInstance(cafeId,cafeName,cafePlace);
        Optional<Cafe> opCafe= Optional.of(cafe);
        BookMark bookMark = BookMark.newTestInstance(isMarked,user,cafePlace);

        // 스터빙은 호출이 안되면 불필요하다고 판단한다.
        when(userRepository.findById(anyLong())).thenReturn(opUser);
//        when(cultureRepository.findById(anyLong())).thenReturn(opCulture);
        when(cafeRepository.findById(anyLong())).thenReturn(opCafe);
        // bookmark의 place를 바꿔가며 확인 바람
        when(bookMarkRepository.save(any(BookMark.class))).thenReturn(bookMark);

        // when
//        BookMarkPostResponseDto bookMarkPostResponseDto = bookMarkService.bookMarked(userId, cultureId, "culture");
//        BookMarkPostResponseDto bookMarkPostResponseDto2 = bookMarkService.bookMarked(userId, cafeId, "cafe");

        // then
//        assertThat(bookMarkPostResponseDto.getPlaceName()).isEqualTo("culturePlace");
//        assertThat(bookMarkPostResponseDto2.getPlaceName()).isEqualTo("cafePlace");


    }

    @DisplayName("북마크 삭제")
    @Test
    void deleteBookMark() {
    }

    @Test
    void getBookMarks() {
    }
}