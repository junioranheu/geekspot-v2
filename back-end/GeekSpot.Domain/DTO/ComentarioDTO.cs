﻿using System.ComponentModel.DataAnnotations;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Domain.DTO
{
    public class ComentarioDTO : _RetornoApiDTO
    {
        [Key]
        public int ComentarioId { get; set; }

        // Fk (De lá pra cá);
        public int ItemId { get; set; }
        public ItemDTO? Itens { get; set; }

        // Fk (De lá pra cá);
        public int UsuarioId { get; set; } // Usuário que fez a pergunta;
        public UsuarioDTO? Usuarios { get; set; }

        public string? Mensagem { get; set; } = null;
        public string? Resposta { get; set; } = null;

        public int IsAtivo { get; set; } = 1;
        public DateTime? DataEnvio { get; set; } = HorarioBrasilia();
    }
}
