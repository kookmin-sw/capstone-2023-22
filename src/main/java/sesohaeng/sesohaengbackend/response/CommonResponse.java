package sesohaeng.sesohaengbackend.response;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public abstract class CommonResponse {
    private boolean success;
    private int status;
    private String message;
}
