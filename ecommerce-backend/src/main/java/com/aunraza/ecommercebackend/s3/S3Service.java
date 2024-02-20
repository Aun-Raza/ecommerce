package com.aunraza.ecommercebackend.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;

@Service
public class S3Service {
    private final AmazonS3 s3Client;

    public S3Service(AmazonS3 s3Client) {
        this.s3Client = s3Client;
    }

    public byte[] getObject(String bucketName, String key) {
        var file = s3Client.getObject(bucketName, key);
        S3ObjectInputStream objectContent = file.getObjectContent();
        try {
            return objectContent.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public void putObject(String bucketName, String key, MultipartFile image) throws IOException {
        var file = convertMultiPartToFile(image);
        s3Client.putObject(bucketName, key, file);
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
