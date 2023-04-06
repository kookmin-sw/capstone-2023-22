package sesohaeng.sesohaengbackend.dto.response.place;


import lombok.AllArgsConstructor;
import lombok.Data;
import sesohaeng.sesohaengbackend.domain.culture.Culture;
import sesohaeng.sesohaengbackend.dto.response.cafe.CafeResponseDto;
import sesohaeng.sesohaengbackend.dto.response.culture.CultureResponseDto;

@Data
@AllArgsConstructor
public class PlaceResponseDto {

    CafeResponseDto cafeResponseDto;

    CultureResponseDto cultureResponseDto;
}
