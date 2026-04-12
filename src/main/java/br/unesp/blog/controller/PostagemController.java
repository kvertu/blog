package br.unesp.blog.controller;

import java.util.List;
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

import br.unesp.blog.entity.Postagem;
import br.unesp.blog.repository.PostagemRepository;

// TODO: Incluir o blog no qual a postagem pertence não funciona nos métodos cadastrarPostagem e atualizarPostagem
@Controller("PostagemController")
@RequestMapping("/postagem")
public class PostagemController {
    @Autowired
    private PostagemRepository postagemRepository;

    @GetMapping("/")
    public ResponseEntity<List<Postagem>> listarPostagens() {
        List<Postagem> postagens = (List<Postagem>) postagemRepository.findAll();

        return new ResponseEntity<>(postagens, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Postagem> listarPostagem(@PathVariable Long id) {
        Optional<Postagem> postagem = postagemRepository.findById(id);

        if (postagem.isPresent()) {
            return new ResponseEntity<>(postagem.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<Postagem> cadastrarPostagem(@RequestBody Postagem entity) {
        Postagem savedPostagem = postagemRepository.save(entity);
        
        return new ResponseEntity<>(savedPostagem, HttpStatus.OK);
    }
    
    @PutMapping("/")
    public ResponseEntity<Postagem> atualizarPostagem(@RequestBody Postagem entity) {
        Postagem updatedPostagem = postagemRepository.save(entity);
        
        return new ResponseEntity<>(updatedPostagem, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Postagem> deletarPostagem(@PathVariable Long id) {
        postagemRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
