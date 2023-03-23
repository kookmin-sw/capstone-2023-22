package sesohaeng.sesohaengbackend.response;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@SuperBuilder
public class ListResponse<T> extends CommonResponse{
    private List<T> result;
}
