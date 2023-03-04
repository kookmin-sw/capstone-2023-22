package sesohaeng.sesohaengbackend.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {
    USER("ROLE_USER","user");

    private final String role;
    private final String name;
}
