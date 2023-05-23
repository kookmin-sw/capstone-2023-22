package sesohaeng.sesohaengbackend.controller.user.dto.request;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUsernameRequest {
    @NotNull
    String userName;
}
