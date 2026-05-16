package br.unesp.blog.repository;

import br.unesp.blog.entity.Imagem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagemRepository extends CrudRepository<Imagem, Long> {}
