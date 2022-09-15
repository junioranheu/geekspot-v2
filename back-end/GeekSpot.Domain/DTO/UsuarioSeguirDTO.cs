using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GeekSpot.Domain.DTO
{
    public class UsuarioSeguirDTO: _RetornoApiDTO
    {
        [Key]
        public int UsuarioSeguirId { get; set; }

        /////////////////////////////////////////////////////////
        // Como fazer duas FKs da mesma classe se relacionarem //
        // https://stackoverflow.com/a/57470931                //
        /////////////////////////////////////////////////////////

        // Fk (De lá pra cá);
        [ForeignKey(nameof(UsuariosSeguidos))]
        public int UsuarioSeguidoId { get; set; } // Usuário que é seguido;
        public UsuarioDTO? UsuariosSeguidos { get; set; }

        // Fk (De lá pra cá);
        [ForeignKey(nameof(UsuariosSeguidores))]
        public int UsuarioSeguidorId { get; set; } // Usuário que segue o "UsuarioSeguidoId"; 
        public UsuarioDTO? UsuariosSeguidores { get; set; }

        public DateTime? DataRegistro { get; set; }
    }
}
