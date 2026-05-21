package br.unesp.blog.repository;

import br.unesp.blog.entity.Postagem;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostagemRepository extends CrudRepository<Postagem, Long> {
    List<Postagem> findByBlogId(Long id);
}
