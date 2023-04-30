package sesohaeng.sesohaengbackend.service.bookmark;

import sesohaeng.sesohaengbackend.dto.response.bookmark.BookmarkResponseDto;

import java.util.List;

public interface BookMarkService {
    void bookMarked(Long userId, Long Id);
    List<BookmarkResponseDto> getBookMarks(Long userId);
}
