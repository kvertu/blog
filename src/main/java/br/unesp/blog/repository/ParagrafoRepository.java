package br.unesp.blog.repository;

import br.unesp.blog.entity.Paragrafo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParagrafoRepository extends CrudRepository<Paragrafo, Long> {}
