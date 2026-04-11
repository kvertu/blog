package br.unesp.blog.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.unesp.blog.entity.Comentario;

@Repository
public interface ComentarioRepository extends CrudRepository<Comentario, Long> {
    
}
