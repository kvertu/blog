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
import org.springframework.web.bind.annotation.RequestMapping;

import br.unesp.blog.entity.Blog;
import br.unesp.blog.repository.BlogRepository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@Controller("BlogController")
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private BlogRepository blogRepository;

    @GetMapping(value = "/", produces = "application/json")
    public ResponseEntity<List<Blog>> listarBlogs() {
        List<Blog> blogs = (List<Blog>) blogRepository.findAll();

        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }
    
    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Blog> listarBlog(@PathVariable Long id) {
        Optional<Blog> blog = blogRepository.findById(id);

        if (blog.isPresent()) {
            return new ResponseEntity<>(blog.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Blog> cadastrarBlog(@RequestBody Blog entity) {
        Blog savedBlog = blogRepository.save(entity);
        
        return new ResponseEntity<>(savedBlog, HttpStatus.OK);
    }
    
    @PutMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Blog> atualizarBlog(@RequestBody Blog entity) {
        Blog updatedBlog = blogRepository.save(entity);
        
        return new ResponseEntity<>(updatedBlog, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Blog> deletarBlog(@PathVariable Long id) {
        blogRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
