package sesohaeng.sesohaengbackend.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NotLogInException extends RuntimeException{
    private String message = "인증없이 요청하였습니다. 로그인을 해주세요";

    public NotLogInException(String message) {
        super(message);
        this.message = message;
    }
}
