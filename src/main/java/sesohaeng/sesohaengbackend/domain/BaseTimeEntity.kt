package sesohaeng.sesohaengbackend.domain

import lombok.Getter
import org.hibernate.annotations.CreationTimestamp
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.EntityListeners
import javax.persistence.MappedSuperclass

//@MappedSuperclass
//공통 매핑 정보가 필요할 때 사용. 상속받는 클래스에서 createDtm, modifyDtm도 컬럼으로 인식
//해당 Annotation이 선언된 클래스는 Entity가 아니며, 직접 사용될 일이 없기 때문에 추상 클래스로 생성
//@EntityListeners(AuditingEntityListener::class)
//Entity에서 이벤트가 발생할 때마다 특정 기능을 수행
//여기서 특정 기능은 Auditing
//@CreatedDate
//생성 시간 자동 저장
//@LastModifiedDate
//수정 시간 자동 저장
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
abstract class BaseTimeEntity {

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    var createdAt: LocalDateTime = LocalDateTime.now()
        protected set

    @LastModifiedDate
    @Column(nullable = false)
    var modifiedAt: LocalDateTime = LocalDateTime.now()
        protected set

}