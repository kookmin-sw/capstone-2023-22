package sesohaeng.sesohaengbackend.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DuplicateUserException extends RuntimeException{
    private String message = "중복된 유저가 존재합니다.";

    public DuplicateUserException(String message) {
        super(message);
        this.message = message;
    }
}
