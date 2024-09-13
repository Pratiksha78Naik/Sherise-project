package com.backend.demo.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


@Data

public class ProductDto {

    private Long id;
    private String name;
    private String description;
    private Long price;

    private byte[] byteImg;

    private Long categoryId;

    private String categoryName;

    private MultipartFile img;
}
