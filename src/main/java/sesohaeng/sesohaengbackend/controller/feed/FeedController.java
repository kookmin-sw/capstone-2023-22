package sesohaeng.sesohaengbackend.controller.feed;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sesohaeng.sesohaengbackend.controller.feed.dto.request.FeedCreateRequest;
import sesohaeng.sesohaengbackend.response.CommonResponse;
import sesohaeng.sesohaengbackend.response.SingleResponse;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;
import sesohaeng.sesohaengbackend.service.feed.FeedService;
import sesohaeng.sesohaengbackend.service.feed.dto.request.FeedServiceRequest;
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedListServiceResponse;
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedServiceResponse;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class FeedController {
    private final FeedService feedService;

    @PostMapping
    public final CommonResponse createFeed(@RequestBody @Valid final FeedCreateRequest feedCreateRequest, CustomUserDetails customUserDetails) {
        return SingleResponse.<FeedServiceResponse>builder()
                .success(true)
                .status(200)
                .message("피드 작성 성공")
                .data(feedService.saveFeed(FeedServiceRequest.newInstance(
                        feedCreateRequest.getContent(),
                        feedCreateRequest.getPlaceId()
                ), Long.valueOf(customUserDetails.getName())))
                .build();
    }

    @GetMapping()
    public final CommonResponse getFeeds() {
        return SingleResponse.<FeedListServiceResponse>builder()
                .success(true)
                .status(200)
                .message("피드 리스트 가져오기 성공")
                .data(feedService.getFeeds())
                .build();
    }

    @GetMapping("/{id}")
    public final CommonResponse getFeed(@PathVariable(name = "id") final Long id) {
        return SingleResponse.<FeedServiceResponse>builder()
                .success(true)
                .status(200)
                .message("피드 상세 페이지 가져오기 성공")
                .data(feedService.getFeed(id))
                .build();
    }

    @PutMapping("/{id}")
    public final CommonResponse updateFeed(@PathVariable(name = "id") final Long id, @RequestBody @Valid final FeedCreateRequest feedCreateRequest) {
        return SingleResponse.<FeedServiceResponse>builder()
                .success(true)
                .status(200)
                .message("피드 수정 성공")
                .data(feedService.updateFeed(id, FeedServiceRequest.newInstance(
                        feedCreateRequest.getContent(),
                        feedCreateRequest.getPlaceId()
                )))
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
}
