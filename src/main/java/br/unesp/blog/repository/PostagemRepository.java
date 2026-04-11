package br.unesp.blog.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.unesp.blog.entity.Postagem;

@Repository
public interface PostagemRepository extends CrudRepository<Postagem, Long> {
    
}
