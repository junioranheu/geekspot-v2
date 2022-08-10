using System.ComponentModel.DataAnnotations;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Domain.DTO
{
    public class ItemDTO : _RetornoApiDTO
    {
        [Key]
        public int ItemId { get; set; }

        public string? Nome { get; set; } = null;
        public string? Descricao { get; set; } = null;
        public string? Imagem { get; set; } = null;
        public double? Preco { get; set; } = 0;
        public double? PrecoDesconto { get; set; } = 0;

        // Fk (De lá pra cá);
        public int UsuarioId { get; set; }
        public UsuarioDTO? Usuarios { get; set; }

        // Fk (De lá pra cá);
        public int ItemTipoId { get; set; }
        public ItemTipoDTO? ItensTipos { get; set; }

        public int IsAtivo { get; set; } = 1;
        public DateTime? DataRegistro { get; set; } = HorarioBrasilia();
    }
}
