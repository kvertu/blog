package br.unesp.blog.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(optional = false)
    private Usuario autor;

    private String texto;

    private Date dataCriacao;

    @ManyToOne //(optional = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Postagem postagem;

    public Comentario(Usuario autor, String texto, Date dataCriacao, Postagem postagem) {
        this.autor = autor;
        this.texto = texto;
        this.dataCriacao = dataCriacao;
        this.postagem = postagem;
    }
}
