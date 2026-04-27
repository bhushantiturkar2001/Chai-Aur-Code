package com.knowlia.megablogs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.knowlia.megablogs.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByStatus(String status);
}