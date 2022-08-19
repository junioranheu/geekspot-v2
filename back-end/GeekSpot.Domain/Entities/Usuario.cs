﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Domain.Entities
{
    public class Usuario
    {
        [Key]
        public int UsuarioId { get; set; }
        public string? NomeCompleto { get; set; } = null;
        public string? Email { get; set; } = null;
        public string? NomeUsuarioSistema { get; set; } = null;
        public string? Senha { get; set; } = null;

        // Fk (De lá pra cá);
        public int UsuarioTipoId { get; set; }
        public UsuarioTipo? UsuariosTipos { get; set; }

        public string? Foto { get; set; }
        public DateTime DataRegistro { get; set; } = HorarioBrasilia();
        public DateTime DataOnline { get; set; }
        public int IsAtivo { get; set; } = 1;
        public int IsPremium { get; set; } = 0;
        public int IsVerificado { get; set; } = 0;

        public string? CodigoVerificacao { get; set; } = null;
        public DateTime ValidadeCodigoVerificacao { get; set; }
        public string? CodigoTrocarSenha { get; set; } = null;
        public DateTime ValidadeCodigoTrocarSenha { get; set; }


        // Fk (De cá pra lá);
        [JsonIgnore]
        public UsuarioInformacao? UsuariosInformacoes { get; set; }
    }
}
