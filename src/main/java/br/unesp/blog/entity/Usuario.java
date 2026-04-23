package br.unesp.blog.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Nonnull;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;

    @Nonnull
    @JsonIgnore // Evitar dados duplicados
    private String login;
    @Nonnull
    @JsonIgnore // Evitar dados duplicados
    private String senha;
    private UserRole role;

    private String email;

    @Embedded
    private Telefone celular;

    @OneToMany(mappedBy = "autor", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Postagem> postagens = new ArrayList<>();

    @OneToMany(mappedBy = "autor", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Comentario> comentarios = new ArrayList<>();

    @ManyToMany(mappedBy = "autores", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Blog> blogs = new ArrayList<>();

    // Apenas os campos essenciais para registrar um novo usuário
    public Usuario(String nome, String login, String senha, UserRole role, String email, Telefone celular) {
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.role = role;
        this.email = email;
        this.celular = celular;
    }

    public Usuario(String nome, String login, String senha, UserRole role, String email, Telefone celular,
            List<Postagem> postagens, List<Comentario> comentarios, List<Blog> blogs) {
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.role = role;
        this.email = email;
        this.celular = celular;
        this.postagens = postagens;
        this.comentarios = comentarios;
        this.blogs = blogs;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN){
            return List.of(
                new SimpleGrantedAuthority("ROLE_ADMIN"),   // Admin
                new SimpleGrantedAuthority("ROLE_USER")     // é ao mesmo tempo user normal
                );
        }else{
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public @Nullable String getPassword() {
        return this.getSenha();
    }

    @Override
    public String getUsername() {
        return this.getLogin();
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }
    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }
}
