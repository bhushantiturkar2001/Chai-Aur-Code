package com.knowlia.megablogs.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "articles", indexes = { @Index(name = "idx_status", columnList = "status ASC") })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Article {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", length = 300, nullable = false)
	private String title;

	@Column(name = "content", columnDefinition = "TEXT", nullable = false)
	private String content;

	@Column(name = "image", length = 500, nullable = false)
	private String image;   // stores the uploaded file name returned by /api/files/upload

	@Column(name = "status")
	private String status;

	@Column(name = "user_id", nullable = false)
	private String userId;
}