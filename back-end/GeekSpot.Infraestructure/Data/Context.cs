using GeekSpot.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GeekSpot.Infraestructure.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
       
        }

        // Cidades e estados;
        public DbSet<Estado> Estados { get; set; }
        public DbSet<Cidade> Cidades { get; set; }

        // Usuários e afins;
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<UsuarioTipo> UsuariosTipos { get; set; }
        public DbSet<UsuarioInformacao> UsuariosInformacoes { get; set; }

        // Itens;
        public DbSet<ItemTipo> ItensTipos { get; set; }
        public DbSet<Item> Itens { get; set; }
        public DbSet<ItemImagem> ItensImagens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
