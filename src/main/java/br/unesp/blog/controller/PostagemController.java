package br.unesp.blog.controller;

import br.unesp.blog.entity.Blog;
import br.unesp.blog.entity.Comentario;
import br.unesp.blog.entity.Componente;
import br.unesp.blog.entity.Postagem;
import br.unesp.blog.repository.BlogRepository;
import br.unesp.blog.repository.PostagemRepository;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("PostagemController")
@RequestMapping("/postagem")
@Transactional
@Slf4j
public class PostagemController {

    @Autowired
    private PostagemRepository postagemRepository;

    @Autowired
    private BlogRepository blogRepository;

    @GetMapping("/{id}")
    public ResponseEntity<List<Postagem>> listarPostagens(
        @PathVariable Long id
    ) {
        List<Postagem> postagens = (List<
            Postagem
        >) postagemRepository.findByBlogId(id);

        return new ResponseEntity<>(postagens, HttpStatus.OK);
    }

    @GetMapping("/{idBlog}/{idPost}")
    public ResponseEntity<Postagem> listarPostagem(
        @PathVariable Long idBlog,
        @PathVariable Long idPost
    ) {
        Optional<Postagem> postagem = postagemRepository.findById(idPost);

        if (
            postagem.isPresent() && postagem.get().getBlog().getId() == idBlog
        ) {
            return new ResponseEntity<>(postagem.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<Postagem> cadastrarPostagem(
        @RequestBody Postagem entity
    ) {
        resolverBlog(entity);

        // Sincroniza o lado inverso da relação
        // Evita violação de chave estrangeira
        if (entity.getConteudo() != null) {
            for (Componente componente : entity.getConteudo()) {
                componente.setPostagem(entity);
            }
        }
        if (entity.getComentarios() != null) {
            for (Comentario comentario : entity.getComentarios()) {
                comentario.setPostagem(entity);
            }
        }

        Postagem savedPostagem = postagemRepository.save(entity);

        return new ResponseEntity<>(savedPostagem, HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<Postagem> atualizarPostagem(
        @RequestBody Postagem entity
    ) {
        Optional<Postagem> p = postagemRepository.findById(entity.getId());
        if (p.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        entity.setBlog(p.get().getBlog());
        resolverBlog(entity);

        // Sincroniza o lado inverso da relação
        // Evita violação de chave estrangeira
        if (entity.getConteudo() != null) {
            for (Componente componente : entity.getConteudo()) {
                componente.setPostagem(entity);
            }
        }
        if (entity.getComentarios() != null) {
            for (Comentario comentario : entity.getComentarios()) {
                comentario.setPostagem(entity);
            }
        }

        Postagem updatedPostagem = postagemRepository.save(entity);

        return new ResponseEntity<>(updatedPostagem, HttpStatus.OK);
    }

    private void resolverBlog(Postagem entity) {
        if (entity.getBlog() != null && entity.getBlog().getId() != null) {
            Optional<Blog> blog = blogRepository.findById(
                entity.getBlog().getId()
            );
            blog.ifPresent(entity::setBlog);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Postagem> deletarPostagem(@PathVariable Long id) {
        postagemRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
