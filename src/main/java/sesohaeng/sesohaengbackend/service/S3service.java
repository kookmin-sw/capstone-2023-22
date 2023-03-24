package sesohaeng.sesohaengbackend.service;


import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sesohaeng.sesohaengbackend.dto.response.FileRequestDto;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3service {

    private AmazonS3Client s3Client;

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String region;//지역설정

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostConstruct
    public void setS3Client(){
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey,this.secretKey);

        s3Client = (AmazonS3Client) AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(this.region)
                .build();
    }

    // 파일 업로드
    public FileRequestDto upload(MultipartFile file){
        if(file==null){
            return null;
        }
        String fileName = createFileName(file.getOriginalFilename());// 파일명 난수로 변경
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        try (InputStream inputStream = file.getInputStream()){
            s3Client.putObject(new PutObjectRequest(bucket,fileName,inputStream,objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead)); // 파일 업로드
            // 퍼블릭 리드로 정해야 링크로 이미지나 파일을 읽어올 수 있다.
            return new FileRequestDto(s3Client.getUrl(bucket,fileName).toString(),fileName);
        }catch (IOException e){
            throw new IllegalArgumentException("파일 업로드에 실패했습니다.");
        }
    }

    // 이미지 삭제
    public void deleteImageUrl(String filePath){
        String filepathReal = filePath.split(".com/")[1];
        log.info("버킷에 저장된 진짜 파일 경로= {}",filepathReal);

        // 삭제 코드
        if(!"".equals(filepathReal)&&filepathReal!=null){
            boolean isExistObject = s3Client.doesObjectExist(bucket,filepathReal);
            if(isExistObject){
                s3Client.deleteObject(bucket,filepathReal);
            }
        }
    }


    // 파일명 난수로 변경
    private String createFileName(String fileName) {
        // 먼저 파일 업로드 시, 파일명을 난수화하기 위해 random으로 돌립니다.
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    // 파일 유효성 검사
    private String getFileExtension(String fileName) {
        // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며,
        // 파일 타입과 상관없이 업로드할 수 있게 하기 위해 .의 존재 유무만 판단
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new IllegalArgumentException("파일 확장자가 명시되어있지 않습니다.");
        }
    }
}
