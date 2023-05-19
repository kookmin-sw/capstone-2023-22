package sesohaeng.sesohaengbackend.service.area;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.area.AreaRepository;
import sesohaeng.sesohaengbackend.dto.response.area.AreaResponseDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;
import sesohaeng.sesohaengbackend.service.area.dto.AreaRankResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AreaServiceImpl implements AreaService{
    // 파이널 안 걸면 에러 납니다.
    private final AreaRepository areaRepository;



    @Transactional
    @Override
    public List<AreaResponseDto> getAreas(){
        List<AreaResponseDto> responseDtos = new ArrayList<>();
        List<Area> areas = areaRepository.findAll();
        areas.forEach(area -> {
            responseDtos.add(new AreaResponseDto(area.getId(), area.getAreaName(),area.getLatitude(),area.getLongitude()));
        });
        return responseDtos;
    }

    @Transactional
    @Override
    public AreaResponseDto getArea(Long id){
        Area byId = areaRepository.findById(id)
                .orElseThrow(NoDataException::new);
        return new AreaResponseDto(byId.getId(), byId.getAreaName(), byId.getLatitude(),byId.getLongitude());
    }

    @Transactional
    public List<AreaRankResponse> getAreaRanking() {
        List<Area> areas = areaRepository.findFirst10ByOrderByFeedCountDesc();

        return areas.stream()
                .map(area -> new AreaRankResponse(area.getAreaName(), area.getFeedCount()))
                .collect(Collectors.toList());
    }
}
