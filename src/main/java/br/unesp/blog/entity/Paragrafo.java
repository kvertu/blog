package br.unesp.blog.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
public class Paragrafo extends Componente {

    private Integer fontSize;
    private FontWeight fontWeight;
    private String value;
}
