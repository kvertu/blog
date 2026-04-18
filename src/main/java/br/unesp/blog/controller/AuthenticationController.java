package br.unesp.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.unesp.blog.dto.AutenticationDTO;
import br.unesp.blog.dto.LoginResponseDTO;
import br.unesp.blog.dto.RegisterDTO;
import br.unesp.blog.entity.Usuario;
import br.unesp.blog.repository.UsuarioRepository;
import br.unesp.blog.security.TokenService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private TokenService tokenService;

    // FIXME: endpoint de login ainda não funciona
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AutenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.senha());

        try {
            var auth = authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((Usuario) auth.getPrincipal());

            return new ResponseEntity<>(new LoginResponseDTO(token), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Falha ao autenticar usuário", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterDTO data) {
        if (usuarioRepository.findByLogin(data.login()) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        log.debug("Registering user {} ({}). Hash: {}", data.login(), data.role(), encryptedPassword);
        
        Usuario newUsuario = new Usuario(data.nome(), data.login(), encryptedPassword, data.role(), data.email(), data.celular());
        usuarioRepository.save(newUsuario);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
