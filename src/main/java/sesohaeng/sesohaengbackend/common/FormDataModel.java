package sesohaeng.sesohaengbackend.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import sesohaeng.sesohaengbackend.controller.feed.dto.request.FeedCreateRequest;

@Data
public class FormDataModel {
    private MultipartFile image;

    private FeedCreateRequest feedCreateRequest;

    public void setFeedCreateRequest(String feedCreateRequest) {
        ObjectMapper mapper = new ObjectMapper();

        try {
            this.feedCreateRequest = mapper.readValue(feedCreateRequest, FeedCreateRequest.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
