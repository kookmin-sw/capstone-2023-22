package sesohaeng.sesohaengbackend.controller.feed;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.controller.feed.dto.request.FeedCreateRequest;
import sesohaeng.sesohaengbackend.response.CommonResponse;
import sesohaeng.sesohaengbackend.response.SingleResponse;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;
import sesohaeng.sesohaengbackend.service.feed.FeedService;
import sesohaeng.sesohaengbackend.service.feed.dto.request.FeedServiceRequest;
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedServiceResponse;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feed")
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
}
