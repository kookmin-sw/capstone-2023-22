package sesohaeng.sesohaengbackend.domain.place;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import sesohaeng.sesohaengbackend.dto.querydsl.place.GetPlaceListDto;
import sesohaeng.sesohaengbackend.dto.querydsl.place.QGetPlaceListDto;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static sesohaeng.sesohaengbackend.domain.place.QPlace.place;

@Repository
public class PlaceRepositoryImpl implements PlaceRepositoryCustom{

    @PersistenceContext
    EntityManager em;

    private final JPAQueryFactory queryFactory;

    public PlaceRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<GetPlaceListDto> searchPlaceByKeyword(String keyword) {
        return queryFactory
                .select(new QGetPlaceListDto(
                        place.id,
                        place.placeName
                )).from(place)
                .where(place.placeName.contains(keyword))
                .fetch();
    }
}
