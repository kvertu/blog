package br.unesp.blog.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import java.sql.Date;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "blog_usuario",
        joinColumns = @JoinColumn(name = "blog_id"),
        inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> autores;

    private Date dataCriacao;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL)
    private List<Postagem> postagens;

    public Blog(
        String nome,
        List<Usuario> autores,
        Date dataCriacao,
        List<Postagem> postagens
    ) {
        this.nome = nome;
        this.autores = autores;
        this.dataCriacao = dataCriacao;
        this.postagens = postagens;
    }

    // setPostagens precisa ser definido manualmente para garantir relação entre os comentarios
    public void setPostagens(List<Postagem> postagens) {
        this.postagens = postagens;

        if (postagens != null) {
            for (Postagem postagem : postagens) {
                postagem.setBlog(this);
            }
        }
    }
}
