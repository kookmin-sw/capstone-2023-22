package sesohaeng.sesohaengbackend.service.bookmark;

import sesohaeng.sesohaengbackend.dto.response.bookmark.BookMarkDeleteResponseDto;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookMarkPostResponseDto;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookmarkResponseDto;

import java.util.List;

public interface BookMarkService {
    BookMarkPostResponseDto bookMarked(Long userId, Long Id);

    BookMarkDeleteResponseDto deleteBookMark(Long id);
    List<BookmarkResponseDto> getBookMarks(Long userId);
}
