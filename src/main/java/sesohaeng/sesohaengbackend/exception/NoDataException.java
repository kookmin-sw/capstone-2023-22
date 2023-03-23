package sesohaeng.sesohaengbackend.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoDataException extends RuntimeException{
    private String message = "데이터가 존재하지 않습니다.";

    public NoDataException(String message) {
        super(message);
        this.message = message;
    }
}
