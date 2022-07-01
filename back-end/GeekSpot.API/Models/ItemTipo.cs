using System.ComponentModel.DataAnnotations;

namespace GeekSpot.API.Models
{
    public class ItemTipo
    {
        [Key]
        public int ItemTipoId { get; set; }
        public string? Tipo { get; set; }
        public string? Descricao { get; set; }
        public int IsAtivo { get; set; }
        public DateTime DataRegistro { get; set; }
    }
}
