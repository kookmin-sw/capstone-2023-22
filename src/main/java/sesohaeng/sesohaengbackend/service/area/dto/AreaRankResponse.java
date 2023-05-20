package sesohaeng.sesohaengbackend.service.area.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AreaRankResponse {
    private Long areaId;
    private String areaName;
    private int feedCount;
}
