package com.knowlia.megablogs.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file) throws Exception {

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path path = Paths.get(UPLOAD_DIR + fileName);
        Files.createDirectories(path.getParent());

        Files.write(path, file.getBytes());

        return fileName;
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) throws Exception {

        Path path = Paths.get(UPLOAD_DIR + fileName);
        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + fileName)
                .body(resource);
    }

    @DeleteMapping("/{fileName}")
    public void delete(@PathVariable String fileName) throws Exception {
        Files.deleteIfExists(Paths.get(UPLOAD_DIR + fileName));
    }
}