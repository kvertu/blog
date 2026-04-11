package br.unesp.blog.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Telefone {
    private Integer ddd;
    private Long numero;

    public Telefone(Integer ddd, Long numero) {
        this.ddd = ddd;
        this.numero = numero;
    }
}
