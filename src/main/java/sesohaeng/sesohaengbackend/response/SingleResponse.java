package sesohaeng.sesohaengbackend.response;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class SingleResponse<T> extends CommonResponse{
    T data;
}
