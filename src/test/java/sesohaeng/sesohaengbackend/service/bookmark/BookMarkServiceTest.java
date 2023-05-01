package sesohaeng.sesohaengbackend.service.bookmark;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
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
import static org.junit.jupiter.api.Assertions.*;
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
    }




    @Test
    void bookMarked() {
        // given
        User user = User.newTestInstance(userId, email);
        Optional<User> opUser= Optional.of(user);
        Culture culture = Culture.newTestInstance(cultureId, cultureName, culturePlace);
        Cafe cafe = Cafe.newTestInstance(cafeId,cafeName,cafePlace);
        Optional<Cafe> opCafe= Optional.of(cafe);

        when(userRepository.findById(anyLong())).thenReturn(opUser);
        when(cultureRepository.findById(anyLong())).thenReturn(null);
        when(cafeRepository.findById(anyLong())).thenReturn(opCafe);

        // when
        BookMarkPostResponseDto bookMarkPostResponseDto = bookMarkService.bookMarked(userId, cafeId);

        // then
        assertThat(bookMarkPostResponseDto.getPlaceName()).isEqualTo("cafePlace");


    }

    @Test
    void deleteBookMark() {
    }

    @Test
    void getBookMarks() {
    }
}