package sesohaeng.sesohaengbackend.controller.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import sesohaeng.sesohaengbackend.exception.DuplicateUserException;
import sesohaeng.sesohaengbackend.exception.NoDataException;
import sesohaeng.sesohaengbackend.response.ErrorResponse;

import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public final ErrorResponse handleBadRequest(final MethodArgumentNotValidException e) {
        logger.info("ConstraintViolationException 처리");
        return ErrorResponse.builder()
                .success(false)
                .status(HttpStatus.BAD_REQUEST.value())
                .message(e.getBindingResult()
                        .getFieldErrors()
                        .stream().map(fieldError -> fieldError.getDefaultMessage())
                        .collect(Collectors.toList()).toString())
                .build();
    }

    @ExceptionHandler({DuplicateUserException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public final ErrorResponse handleDulicateUserException(final DuplicateUserException e) {
        logger.error("DuplicateUserException 처리");
        return ErrorResponse.builder()
                .success(false)
                .status(HttpStatus.FORBIDDEN.value())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler({NoDataException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public final ErrorResponse handleNoUserException(final NoDataException e) {
        logger.error("NoUserException 처리");
        return ErrorResponse.builder()
                .success(false)
                .status(HttpStatus.FORBIDDEN.value())
                .message(e.getMessage())
                .build();
    }
}
