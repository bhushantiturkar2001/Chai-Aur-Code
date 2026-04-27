package com.knowlia.megablogs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowlia.megablogs.entity.Article;
import com.knowlia.megablogs.repository.ArticleRepository;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository repo;

    public Article create(Article article) {
        return repo.save(article);
    }

    public Article update(Long id, Article updated) {
        Article article = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        article.setTitle(updated.getTitle());
        article.setContent(updated.getContent());
        article.setStatus(updated.getStatus());
        article.setImage(updated.getImage());

        return repo.save(article);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Article getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Article> getAll(String status) {
        if (status != null) {
            return repo.findByStatus(status);
        }
        return repo.findAll();
    }
}
