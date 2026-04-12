package br.unesp.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import br.unesp.blog.repository.ComentarioRepository;


@Controller("ComentarioController")
@RequestMapping("/comentario")
public class ComentarioController {
    @Autowired
    private ComentarioRepository comentarioRepository;

    // TODO: implementar
}
