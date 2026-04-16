package br.unesp.blog.controller;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import br.unesp.blog.entity.Comentario;
import br.unesp.blog.repository.ComentarioRepository;


@Controller("ComentarioController")
@RequestMapping("/comentario")
public class ComentarioController {
    @Autowired
    private ComentarioRepository comentarioRepository;

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Comentario> buscarComentario(@PathVariable Long id) {
        Optional<Comentario> comentario = comentarioRepository.findById(id);
        if (comentario.isPresent()) {
            return new ResponseEntity<>(comentario.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Comentario> criarComentario(@RequestBody Comentario entity) {
        Comentario savedComentario = comentarioRepository.save(entity);
        return new ResponseEntity<>(savedComentario, HttpStatus.CREATED);
    }
    
    @PutMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Comentario> editarComentario(@RequestBody Comentario entity) {
        if (!comentarioRepository.existsById(entity.getId())) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Comentario updatedComentario = comentarioRepository.save(entity);
        return new ResponseEntity<>(updatedComentario, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletarComentario(@PathVariable Long id) {
        if (!comentarioRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        comentarioRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

