package com.aunraza.ecommercebackend.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

@Service
public class S3Service {
    private final AmazonS3 s3Client;
    private final String bucketName = "ecommerce-backend-aun";
    private final String region = "ca-central-1";

    public S3Service(AmazonS3 s3Client) {
        this.s3Client = s3Client;
    }

    public byte[] getObject(String key) {
        var file = s3Client.getObject(bucketName, key);
        S3ObjectInputStream objectContent = file.getObjectContent();
        try {
            return objectContent.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public String putObject(String key, MultipartFile image) throws IOException {
        if (!image.getContentType().equals(MediaType.IMAGE_JPEG_VALUE)
                && !image.getContentType().equals(MediaType.IMAGE_PNG_VALUE)) {
            throw new IllegalArgumentException("Only JPEG and PNG images are allowed.");
        }

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(image.getContentType());

        try (InputStream inputStream = image.getInputStream()) {
            PutObjectRequest request = new PutObjectRequest(bucketName, key, inputStream, metadata);
            s3Client.putObject(request);
        } catch (IOException e) {
            // Handle exceptions properly here
            throw new IOException("Error uploading file to S3", e);
        }
        return String.format("https://%s.s3.%s.amazonaws.com/%s",
                bucketName, region, key);
    }

    public void deleteObject(String key) throws IOException {
        DeleteObjectRequest request = new DeleteObjectRequest(bucketName, key);
        s3Client.deleteObject(request);
    }
}
