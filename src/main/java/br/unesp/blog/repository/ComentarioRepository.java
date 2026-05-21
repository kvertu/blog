package br.unesp.blog.repository;

import br.unesp.blog.entity.Comentario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioRepository
    extends CrudRepository<Comentario, Long> {}
