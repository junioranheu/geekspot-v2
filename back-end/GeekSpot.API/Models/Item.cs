using System.ComponentModel.DataAnnotations;

namespace GeekSpot.API.Models
{
    public class Item
    {
        [Key]
        public int ItemId { get; set; }

        public string? Nome { get; set; }
        public string? Descricao { get; set; }
        public string? Imagem { get; set; }
        public double? Preco { get; set; }
        public double? PrecoDesconto { get; set; }

        // Fk (De lá pra cá);
        public int UsuarioId { get; set; }
        public Usuario? Usuarios { get; set; }

        // Fk (De lá pra cá);
        public int ItemTipoId { get; set; }
        public ItemTipo? ItensTipos { get; set; }

        public int IsAtivo { get; set; }
        public DateTime? DataRegistro { get; set; }
    }
}
