package br.unesp.blog.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Postagem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Usuario autor;

    private String titulo;

    private String subtitulo;

    @OneToMany(
        mappedBy = "postagem",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Componente> conteudo;

    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Blog blog;

    @OneToMany(
        mappedBy = "postagem",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Comentario> comentarios;

    // setComentarios precisa ser definido manualmente para garantir relação entre os comentarios
    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;

        if (comentarios != null) {
            for (Comentario comentario : comentarios) {
                comentario.setPostagem(this);
            }
        }
    }

    // setConteudo precisa ser definido manualmente para garantir relação entre os componentes
    public void setConteudo(List<Componente> conteudo) {
        this.conteudo = conteudo;

        if (conteudo != null) {
            for (Componente componente : conteudo) {
                componente.setPostagem(this);
            }
        }
    }
}
