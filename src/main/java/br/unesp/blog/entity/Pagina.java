package br.unesp.blog.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Pagina {
    private String texto;
    private String imagemCaminho;

    public Pagina(String texto, String imagemCaminho) {
        this.texto = texto;
        this.imagemCaminho = imagemCaminho;
    }
}
