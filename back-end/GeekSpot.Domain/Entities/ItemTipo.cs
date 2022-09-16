using System.ComponentModel.DataAnnotations;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Domain.Entities
{
    public class ItemTipo
    {
        [Key]
        public int ItemTipoId { get; set; }
        public string? Tipo { get; set; } = null;
        public string? Descricao { get; set; } = null;
        public int IsNovoTipo { get; set; } = 0;
        public int IsAtivo { get; set; } = 1;
        public DateTime DataRegistro { get; set; } = HorarioBrasilia();
    }
}
