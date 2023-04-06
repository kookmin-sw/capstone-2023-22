package sesohaeng.sesohaengbackend.domain.place;

import com.querydsl.jpa.impl.JPAQueryFactory;
import sesohaeng.sesohaengbackend.dto.querydsl.place.QGetPlaceListDto;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class PlaceRepositoryImpl implements PlaceRepositoryCustom{

    @PersistenceContext
    EntityManager em;

    private final JPAQueryFactory queryFactory;

    public PlaceRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<QGetPlaceListDto> searchPlaceByKeyword(String keyword) {
        return queryFactory
                .select(new QGetPlaceListDto(
                        QPlace.place.id,
                        QPlace.place.placeName
                ))
    }
}
