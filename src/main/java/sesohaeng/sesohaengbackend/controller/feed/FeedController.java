package sesohaeng.sesohaengbackend.controller.feed;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sesohaeng.sesohaengbackend.controller.feed.dto.request.FeedCreateRequest;
import sesohaeng.sesohaengbackend.response.CommonResponse;
import sesohaeng.sesohaengbackend.response.ListResponse;
import sesohaeng.sesohaengbackend.response.SingleResponse;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;
import sesohaeng.sesohaengbackend.service.feed.FeedService;
import sesohaeng.sesohaengbackend.service.feed.dto.request.FeedServiceRequest;
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedServiceResponse;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class FeedController {
    private final FeedService feedService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public final CommonResponse createFeed(HttpServletRequest request, @RequestPart @Valid final FeedCreateRequest feedCreateRequest, @RequestPart MultipartFile image, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return SingleResponse.<FeedServiceResponse>builder()
                .success(true)
                .status(200)
                .message("피드 작성 성공")
                .data(feedService.saveFeed(FeedServiceRequest.newInstance(
                        feedCreateRequest.getContent(),
                        feedCreateRequest.getPlaceName()
                ), Long.valueOf(customUserDetails.getName()), image))
                .build();
    }

    @GetMapping()
    public final CommonResponse getFeeds(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ListResponse.<FeedServiceResponse>builder()
                .success(true)
                .status(200)
                .message("피드 리스트 가져오기 성공")
                .result(feedService.getFeeds(Long.valueOf(customUserDetails.getName())))
                .build();
    }

    @GetMapping("/{id}")
    public final CommonResponse getFeed(@PathVariable(name = "id") final Long id, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return SingleResponse.<FeedServiceResponse>builder()
                .success(true)
                .status(200)
                .message("피드 상세 페이지 가져오기 성공")
                .data(feedService.getFeed(id, Long.valueOf(customUserDetails.getName())))
                .build();
    }

    @PutMapping("/{id}")
    public final CommonResponse updateFeed(@PathVariable(name = "id") final Long id, @RequestBody @Valid final FeedCreateRequest feedCreateRequest, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return SingleResponse.<FeedServiceResponse>builder()
                .success(true)
                .status(200)
                .message("피드 수정 성공")
                .data(feedService.updateFeed(id, FeedServiceRequest.newInstance(
                        feedCreateRequest.getContent(),
                        feedCreateRequest.getPlaceName()
                ), Long.valueOf(customUserDetails.getName())))
                .build();
    }

    @DeleteMapping("/{id}")
    public final CommonResponse deleteFeed(@PathVariable(name = "id") final Long id) {
        return SingleResponse.builder()
                .success(true)
                .status(200)
                .message("피드 삭제 성공")
                .data(feedService.deleteFeed(id))
                .build();
    }

    @GetMapping("/my-posts")
    public final CommonResponse getMyFeeds(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ListResponse.<FeedServiceResponse>builder()
                .success(true)
                .status(200)
                .message("내가 쓴 게시물 가져오기 성공")
                .result(feedService.getMyFeeds(Long.valueOf(customUserDetails.getName())))
                .build();
    }

    @PostMapping("/{id}/heart")
    public final CommonResponse heartFeed(@PathVariable(name = "id") final Long id, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return SingleResponse.<Integer>builder()
                .success(true)
                .status(200)
                .message("좋아요 성공")
                .data(feedService.heartFeed(id, Long.valueOf(customUserDetails.getName())))
                .build();
    }

    @DeleteMapping("/{id}/heart")
    public final CommonResponse unHeartFeed(@PathVariable(name = "id") final Long id, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return SingleResponse.<Integer>builder()
                .success(true)
                .status(200)
                .message("좋아요 취소 성공")
                .data(feedService.unHeartFeed(id, Long.valueOf(customUserDetails.getName())))
                .build();
    }

    @GetMapping("/{id}/heart")
    public final CommonResponse isHeartFeed(@PathVariable(name = "id") final Long id, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return SingleResponse.<Boolean>builder()
                .success(true)
                .status(200)
                .message("좋아요 여부 성공")
                .data(feedService.isHeartFeed(id, Long.valueOf(customUserDetails.getName())))
                .build();
    }

    @GetMapping("/my-heart-posts")
    public final CommonResponse getMyHeartFeeds(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ListResponse.<FeedServiceResponse>builder()
                .success(true)
                .status(200)
                .message("내가 좋아요한 게시물 가져오기 성공")
                .result(feedService.getMyHeartFeeds(Long.valueOf(customUserDetails.getName())))
                .build();
    }
}