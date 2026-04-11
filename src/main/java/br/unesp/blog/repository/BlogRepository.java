package br.unesp.blog.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.unesp.blog.entity.Blog;

@Repository
public interface BlogRepository extends CrudRepository<Blog, Long> {
    
}
