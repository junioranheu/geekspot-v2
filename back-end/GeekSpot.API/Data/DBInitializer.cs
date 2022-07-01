using GeekSpot.API.Models;
using static GeekSpot.Biblioteca.Biblioteca;

namespace GeekSpot.API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(Context context)
        {
            // Exclui o esquema, copia as queries, cria esquema/tabelas, popula o BD;
            bool resetarBd = false;
            if (resetarBd)
            {
                context.Database.EnsureDeleted(); // Excluir o esquema e as tabelas;
                // string sqlErro = context.Database.GenerateCreateScript(); // Query para criar as tabelas;
                context.Database.EnsureCreated(); // Recriar o esquema e as tabelas;

                Seed(context);
            }
        }

        public static void Seed(Context context)
        {
            // Hora atual;
            DateTime dataAgora = HorarioBrasilia();

            #region seed_usuarios
            if (!context.UsuariosTipos.Any())
            {
                context.UsuariosTipos.Add(new UsuarioTipo() { UsuarioTipoId = 1, Tipo = "Administrador", Descricao = "Administrador do sistema", IsAtivo = 1, DataRegistro = dataAgora });
                context.UsuariosTipos.Add(new UsuarioTipo() { UsuarioTipoId = 2, Tipo = "Usuário", Descricao = "Usuário comum", IsAtivo = 1, DataRegistro = dataAgora });
                context.UsuariosTipos.Add(new UsuarioTipo() { UsuarioTipoId = 3, Tipo = "Loja", Descricao = "Usuário dono ou administrador de alguma loja", IsAtivo = 1, DataRegistro = dataAgora });
            }

            if (!context.Usuarios.Any())
            {
                context.Usuarios.Add(new Usuario() { UsuarioId = 1, NomeCompleto = "Administrador do GeekSpot", Email = "adm@Hotmail.com", NomeUsuarioSistema = "adm", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = 1, Foto = "", IsAtivo = 1, IsPremium = 1, IsVerificado = 1 });
                context.Usuarios.Add(new Usuario() { UsuarioId = 2, NomeCompleto = "Junior Souza", Email = "juninholorena@Hotmail.com", NomeUsuarioSistema = "junioranheu", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = 2, Foto = "", IsAtivo = 1, IsPremium = 1, IsVerificado = 1 });
                context.Usuarios.Add(new Usuario() { UsuarioId = 3, NomeCompleto = "Usuário Comum de Teste", Email = "usuario@Hotmail.com", NomeUsuarioSistema = "usuario", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = 2, Foto = "", IsAtivo = 1, IsPremium = 1, IsVerificado = 1 });
                context.Usuarios.Add(new Usuario() { UsuarioId = 4, NomeCompleto = "Usuário Loja", Email = "loja@Hotmail.com", NomeUsuarioSistema = "loja", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = 2, Foto = "", IsAtivo = 1, IsPremium = 1, IsVerificado = 1 });
                context.Usuarios.Add(new Usuario() { UsuarioId = 5, NomeCompleto = "Israel Cabrera", Email = "chaleco@Hotmail.com", NomeUsuarioSistema = "chaleco", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = 2, Foto = "", IsAtivo = 1, IsPremium = 1, IsVerificado = 1 });
                context.Usuarios.Add(new Usuario() { UsuarioId = 6, NomeCompleto = "Marcelo Sallerno", Email = "ateu@Hotmail.com", NomeUsuarioSistema = "ateu", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = 2, Foto = "", IsAtivo = 1, IsPremium = 1, IsVerificado = 1 });
            }

            if (!context.UsuariosInformacoes.Any())
            {
                context.UsuariosInformacoes.Add(new UsuarioInformacao()
                {
                    UsuarioInformacaoId = 1,
                    UsuarioId = 2,
                    Genero = 1,
                    DataAniversario = dataAgora,
                    CPF = "44571955880",
                    Telefone = "12 98271-3939",
                    Rua = "José Benedito Ferrari",
                    NumeroResidencia = "480",
                    CEP = "12605-110",
                    Bairro = "Vila Passos",
                    DataUltimaAlteracao = null
                });
            }
            #endregion

            #region seed_itens
            if (!context.ItensTipos.Any())
            {
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 1, Tipo = "Outro", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 2, Tipo = "Acessório gamer", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 3, Tipo = "Action figure", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 4, Tipo = "CD/DVD/Blu-ray", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 5, Tipo = "Carta", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 6, Tipo = "Console", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 7, Tipo = "Cosplay", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 8, Tipo = "HQ/Mangá", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 9, Tipo = "Jogo", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 10, Tipo = "Livro", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 11, Tipo = "Poster", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                context.ItensTipos.Add(new ItemTipo() { ItemTipoId = 12, Tipo = "Vestuário", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
            }

            if (!context.Itens.Any())
            {
                // Itens do usuário @junioranheu (2);
                context.Itens.Add(new Item() { ItemId = 1, Nome = "MacBook", Descricao = "xxx", Imagem = "1.webp", Preco = 4000, PrecoDesconto = null, UsuarioId = 2, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.Itens.Add(new Item() { ItemId = 2, Nome = "Coleção de livros do Harry Potter", Descricao = "xxx", Imagem = "2.webp", Preco = 120.99, PrecoDesconto = null, UsuarioId = 2, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.Itens.Add(new Item() { ItemId = 3, Nome = "Poster de Breaking Bad", Descricao = "xxx", Imagem = "3.webp", Preco = 15, PrecoDesconto = null, UsuarioId = 2, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.Itens.Add(new Item() { ItemId = 4, Nome = "Guitarra do Liam Gallagher", Descricao = "xxx", Imagem = "4.webp", Preco = 12000, PrecoDesconto = 11.099, UsuarioId = 2, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.Itens.Add(new Item() { ItemId = 5, Nome = "Controles de Xbox X e PS5", Descricao = "xxx", Imagem = "5.webp", Preco = 350, PrecoDesconto = 300, UsuarioId = 2, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.Itens.Add(new Item() { ItemId = 6, Nome = "Bonequinhos do Harry Potter", Descricao = "xxx", Imagem = "6.webp", Preco = 80, PrecoDesconto = null, UsuarioId = 2, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });

                // Itens do usuário @chaleco (5);
                context.Itens.Add(new Item() { ItemId = 7, Nome = "iPhone", Descricao = "xxx", Imagem = "7.webp", Preco = 2000, PrecoDesconto = null, UsuarioId = 5, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.Itens.Add(new Item() { ItemId = 8, Nome = "Violão acústico (baby)", Descricao = "xxx", Imagem = "8.webp", Preco = 1200, PrecoDesconto = null, UsuarioId = 5, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.Itens.Add(new Item() { ItemId = 9, Nome = "Headset pro", Descricao = "xxx", Imagem = "9.webp", Preco = 500, PrecoDesconto = 350, UsuarioId = 5, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.Itens.Add(new Item() { ItemId = 10, Nome = "Nintendo Switch V2", Descricao = "xxx", Imagem = "10.webp", Preco = 1700, PrecoDesconto = 1350.99, UsuarioId = 5, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.Itens.Add(new Item() { ItemId = 11, Nome = "PS4", Descricao = "xxx", Imagem = "11.webp", Preco = 3500, PrecoDesconto = null, UsuarioId = 5, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });
                context.Itens.Add(new Item() { ItemId = 12, Nome = "Guatona Kla", Descricao = "xxx", Imagem = "12.webp", Preco = 10000, PrecoDesconto = 9999.99, UsuarioId = 5, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });
            }
            #endregion

            context.SaveChanges();
        }
    }
}

