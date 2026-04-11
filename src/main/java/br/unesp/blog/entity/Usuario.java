package br.unesp.blog.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;
    private String senha;
    private String email;

    @Embedded
    private Telefone celular;

    @OneToMany(mappedBy = "autor", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Postagem> postagens;

    @OneToMany(mappedBy = "autor", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comentario> comentarios;

    @ManyToMany(mappedBy = "autores", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Blog> blogs;

    public Usuario(String nome, String senha, String email, Telefone celular, List<Postagem> postagens,
            List<Comentario> comentarios, List<Blog> blogs) {
        this.nome = nome;
        this.senha = senha;
        this.email = email;
        this.celular = celular;
        this.postagens = postagens;
        this.comentarios = comentarios;
        this.blogs = blogs;
    }
}
