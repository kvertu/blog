package br.unesp.blog.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import br.unesp.blog.entity.Usuario;
import br.unesp.blog.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@Controller("UsuarioController")
@RequestMapping("/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping(value = "/", produces = "application/json")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = (List<Usuario>) usuarioRepository.findAll();

        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }
    
    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Usuario> listarUsuario(@PathVariable() Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);

        if (usuario.isPresent()) {
            return new ResponseEntity<>(usuario.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario entity) {
        Usuario savedUsuario = usuarioRepository.save(entity);
        
        return new ResponseEntity<>(savedUsuario, HttpStatus.OK);
    }

    @PutMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Usuario> atualizarUsuario(@RequestBody Usuario entity) {
        Usuario updatedUsuario = usuarioRepository.save(entity);
        
        return new ResponseEntity<>(updatedUsuario, HttpStatus.OK);
    }
    
    @DeleteMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Usuario> deletarUsuario(@PathVariable() Long id) {
        usuarioRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
