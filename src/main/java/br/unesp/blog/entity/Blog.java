package br.unesp.blog.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;

    @ManyToMany
    @JoinTable(name = "blog_usuario", joinColumns = @JoinColumn(name = "blog_id"), inverseJoinColumns = @JoinColumn(name = "usuario_id"))
    @ToString.Exclude
    private List<Usuario> autores;

    private Date dataCriacao;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Postagem> postagens;

    public Blog(String nome, List<Usuario> autores, Date dataCriacao, List<Postagem> postagens) {
        this.nome = nome;
        this.autores = autores;
        this.dataCriacao = dataCriacao;
        this.postagens = postagens;
    }
}
