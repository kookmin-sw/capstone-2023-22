package sesohaeng.sesohaengbackend.controller.bookmark;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import sesohaeng.sesohaengbackend.dto.request.BookMarkRequestDto;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookMarkDeleteResponseDto;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookMarkPostResponseDto;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookmarkResponseDto;
import sesohaeng.sesohaengbackend.response.CommonResponse;
import sesohaeng.sesohaengbackend.response.ListResponse;
import sesohaeng.sesohaengbackend.response.SingleResponse;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;
import sesohaeng.sesohaengbackend.service.bookmark.BookMarkService;

@Slf4j
@RestController
@AllArgsConstructor
public class BookMarkController {

    private final BookMarkService bookMarkService;

    @GetMapping("/bookmark")
    public final CommonResponse getBookMarks(@AuthenticationPrincipal CustomUserDetails customUserDetails){
        return ListResponse.<BookmarkResponseDto>builder()
                .success(true)
                .status(200)
                .message("북마크 리스트 로딩 성공")
                .result(bookMarkService.getBookMarks(Long.valueOf(customUserDetails.getName())))
                .build();
    }

    @PostMapping("/bookmark")
    public final CommonResponse postBookMark(@RequestBody BookMarkRequestDto dto, @AuthenticationPrincipal CustomUserDetails customUserDetails){
        return SingleResponse.<BookMarkPostResponseDto>builder()
                .success(true)
                .status(200)
                .message("북마크 저장 성공")
                .data(
                        bookMarkService.bookMarked(
                                Long.valueOf(customUserDetails.getName()),
                                dto.getId(),
                                dto.getType()
                        )
                ).build();
    }
    @DeleteMapping("/bookmark{bookmarkId}")
    public final CommonResponse deleteBookMark(@PathVariable Long bookmarkId){
        return SingleResponse.<BookMarkDeleteResponseDto>builder()
                .success(true)
                .status(200)
                .message("북마크 삭제 성공")
                .data(bookMarkService.deleteBookMark(bookmarkId))
                .build();
    }
}
