package br.unesp.blog.dto;

import br.unesp.blog.entity.Telefone;
import br.unesp.blog.entity.UserRole;

public record RegisterDTO(String nome, String email, Telefone celular, String login, String senha, UserRole role) {
    
}
