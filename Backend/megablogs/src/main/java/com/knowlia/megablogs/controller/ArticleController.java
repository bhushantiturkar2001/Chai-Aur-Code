package com.knowlia.megablogs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowlia.megablogs.entity.Article;
import com.knowlia.megablogs.entity.User;
import com.knowlia.megablogs.repository.UserRepository;
import com.knowlia.megablogs.service.ArticleService;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleService service;

    @Autowired
    private UserRepository userRepository;

    // POST /api/articles  — userId is taken from JWT, not from request body
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Article article, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElse(null);
        if (user == null) return ResponseEntity.status(401).body("Unauthorized");

        article.setUserId(String.valueOf(user.getId()));
        return ResponseEntity.ok(service.create(article));
    }

    // PUT /api/articles/{id}  — only the owner can update
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @RequestBody Article article,
                                    Authentication auth) {
        Article existing = service.getOne(id);
        if (existing == null) return ResponseEntity.notFound().build();

        User user = userRepository.findByEmail(auth.getName()).orElse(null);
        if (user == null || !existing.getUserId().equals(String.valueOf(user.getId()))) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        return ResponseEntity.ok(service.update(id, article));
    }

    // DELETE /api/articles/{id}  — only the owner can delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication auth) {
        Article existing = service.getOne(id);
        if (existing == null) return ResponseEntity.notFound().build();

        User user = userRepository.findByEmail(auth.getName()).orElse(null);
        if (user == null || !existing.getUserId().equals(String.valueOf(user.getId()))) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        service.delete(id);
        return ResponseEntity.ok().build();
    }

    // GET /api/articles/{id}
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        Article article = service.getOne(id);
        if (article == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(article);
    }

    // GET /api/articles?status=active
    @GetMapping
    public List<Article> getAll(@RequestParam(required = false) String status) {
        return service.getAll(status);
    }
}
