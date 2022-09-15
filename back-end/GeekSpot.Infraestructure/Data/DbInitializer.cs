using GeekSpot.Domain.Entities;
using GeekSpot.Domain.Enums;
using GeekSpot.Infraestructure.Data.Seed;
using Microsoft.EntityFrameworkCore;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Infraestructure.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(Context context)
        {
            // Exclui o esquema, copia as queries, cria esquema/tabelas, popula o BD;
            bool resetarBd = false;

            if (resetarBd)
            {
                await context.Database.EnsureDeletedAsync(); // Excluir o esquema e as tabelas;
                await context.Database.EnsureCreatedAsync(); // Recriar o esquema e as tabelas;

                await Seed(context, HorarioBrasilia());
            }
        }

        public static async Task Seed(Context context, DateTime dataAgora)
        {
            #region seed_estados_cidades
            await SeedEstados.Seed(context);
            await SeedCidades.Seed(context);
            #endregion

            #region seed_usuarios           
            if (!await context.UsuariosTipos.AnyAsync())
            {
                await context.UsuariosTipos.AddAsync(new UsuarioTipo() { UsuarioTipoId = (int)UsuarioTipoEnum.Administrador, Tipo = nameof(UsuarioTipoEnum.Administrador), Descricao = "Administrador do sistema", IsAtivo = 1, DataRegistro = dataAgora });
                await context.UsuariosTipos.AddAsync(new UsuarioTipo() { UsuarioTipoId = (int)UsuarioTipoEnum.Usuario, Tipo = GetDescricaoEnum(UsuarioTipoEnum.Usuario), Descricao = "Usuário comum", IsAtivo = 1, DataRegistro = dataAgora });
                await context.UsuariosTipos.AddAsync(new UsuarioTipo() { UsuarioTipoId = (int)UsuarioTipoEnum.Loja, Tipo = nameof(UsuarioTipoEnum.Loja), Descricao = "Usuário dono ou administrador de alguma loja", IsAtivo = 1, DataRegistro = dataAgora });
            }

            if (!await context.Usuarios.AnyAsync())
            {
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 1, NomeCompleto = "Administrador do GeekSpot", Email = "adm@Hotmail.com", NomeUsuarioSistema = "adm", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Administrador, Foto = "" });
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 2, NomeCompleto = "Junior Souza", Email = "juninholorena@Hotmail.com", NomeUsuarioSistema = "junioranheu", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Usuario, Foto = "" });
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 3, NomeCompleto = "Usuário Comum de Teste", Email = "usuario@Hotmail.com", NomeUsuarioSistema = "usuario", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Usuario, Foto = "" });
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 4, NomeCompleto = "Usuário Loja", Email = "loja@Hotmail.com", NomeUsuarioSistema = "loja", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Loja, Foto = "" });
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 5, NomeCompleto = "Israel Cabrera", Email = "chaleco@Hotmail.com", NomeUsuarioSistema = "chaleco", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Usuario, Foto = "6.webp" });
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 6, NomeCompleto = "Marcelo Sallerno", Email = "ateu@Hotmail.com", NomeUsuarioSistema = "ateu", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Usuario, Foto = "" });
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 7, NomeCompleto = "Mariana Scalzaretto", Email = "mariana@Hotmail.com", NomeUsuarioSistema = "elfamscal", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Usuario, Foto = "" });
            }

            if (!await context.UsuariosInformacoes.AnyAsync())
            {
                await context.UsuariosInformacoes.AddAsync(new UsuarioInformacao() { UsuarioInformacaoId = 1, UsuarioId = 2, DataAniversario = dataAgora, CPF = "44571955880", Telefone = "12 98271-3939", CEP = 12605110, NumeroResidencia = "480", ReferenciaLocal = "Atrás da antiga fábrica G.A", DataUltimaAlteracao = null, TituloLojinha = "Lojinha Anheu", DescricaoLojinha = "Vendo tudo na metade do preço, só vem", QtdEstrelas = null });
                await context.UsuariosInformacoes.AddAsync(new UsuarioInformacao() { UsuarioInformacaoId = 2, UsuarioId = 5, DataAniversario = dataAgora, CPF = "11111111111", Telefone = "12 99999-9999", CEP = 12606150, NumeroResidencia = "481", ReferenciaLocal = "", DataUltimaAlteracao = null, TituloLojinha = "Lojinha do Chalequito", DescricaoLojinha = "Toy pal hoyo po weon", QtdEstrelas = null });
                await context.UsuariosInformacoes.AddAsync(new UsuarioInformacao() { UsuarioInformacaoId = 3, UsuarioId = 6, DataAniversario = dataAgora, CPF = "22222222222", Telefone = "12 99999-9998", CEP = 12604440, NumeroResidencia = "482", ReferenciaLocal = "", DataUltimaAlteracao = null, TituloLojinha = "Lojinha do Ateu", DescricaoLojinha = "Oi, né?", QtdEstrelas = null });
            }

            if (!await context.UsuariosSeguir.AnyAsync())
            {
                await context.UsuariosSeguir.AddAsync(new UsuarioSeguir() { UsuarioSeguirId = 1, UsuarioSeguidoId = 5, UsuarioSeguidorId = 2, DataRegistro = dataAgora });
            }
            #endregion

            #region seed_itens
            if (!await context.ItensTipos.AnyAsync())
            {
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 1, Tipo = "Outro", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 2, Tipo = "Acessório gamer", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 3, Tipo = "Action figure ou boneco", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 4, Tipo = "CD, DVD ou Blu-ray", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 5, Tipo = "Jogo de carta", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 6, Tipo = "Console", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 7, Tipo = "Cosplay", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 8, Tipo = "HQ ou mangá", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 9, Tipo = "Jogo eletrônico", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 10, Tipo = "Livro", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 11, Tipo = "Poster", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 12, Tipo = "Vestuário", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 13, Tipo = "Música", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 14, Tipo = "Instrumentos musicais e afins", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 15, Tipo = "PC", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 16, Tipo = "Celular", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 17, Tipo = "Relógio", Descricao = "xxx", IsAtivo = 1, DataRegistro = dataAgora });
            }

            if (!await context.Itens.AnyAsync())
            {
                // Itens do usuário @junioranheu (2);
                await context.Itens.AddAsync(new Item() { ItemId = 1, Nome = "MacBook", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Apple", Condicao = nameof(CondicaoEnum.Excelente), Preco = 4000, PrecoDesconto = null, UsuarioId = 2, ItemTipoId = 15, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 2, Nome = "Coleção de livros do Harry Potter", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Warner Bros", Condicao = nameof(CondicaoEnum.Excelente), Preco = 120.99, PrecoDesconto = null, UsuarioId = 2, ItemTipoId = 10, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 3, Nome = "Poster do W.W.", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "NetFlix", Condicao = nameof(CondicaoEnum.Excelente), Preco = 149.99, PrecoDesconto = 99, UsuarioId = 2, ItemTipoId = 11, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 4, Nome = "Guitarra do Liam Gallagher", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Liam Gallagher", Condicao = nameof(CondicaoEnum.Usado), Preco = 12000, PrecoDesconto = 11.099, UsuarioId = 2, ItemTipoId = 14, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 5, Nome = "Controles de Xbox X e PS5", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Playstation e Microsoft", Condicao = nameof(CondicaoEnum.Excelente), Preco = 350, PrecoDesconto = 300, UsuarioId = 2, ItemTipoId = 2, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 6, Nome = "Bonequinhos do Harry Potter", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Warner Bros", Condicao = nameof(CondicaoEnum.Excelente), Preco = 80, PrecoDesconto = null, UsuarioId = 2, ItemTipoId = 3, IsAtivo = 1, DataRegistro = dataAgora });

                // Itens do usuário @chaleco (5);
                await context.Itens.AddAsync(new Item() { ItemId = 7, Nome = "iPhone", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Apple", Condicao = nameof(CondicaoEnum.Excelente), Preco = 2000, PrecoDesconto = null, UsuarioId = 5, ItemTipoId = 16, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 8, Nome = "Violão acústico (baby)", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Shelby", Condicao = nameof(CondicaoEnum.Excelente), Preco = 1200, PrecoDesconto = null, UsuarioId = 5, ItemTipoId = 14, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 9, Nome = "Headset pro", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Razer", Condicao = nameof(CondicaoEnum.Excelente), Preco = 500, PrecoDesconto = 350, UsuarioId = 5, ItemTipoId = 2, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 10, Nome = "Nintendo Switch V2", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Nintendo", Condicao = nameof(CondicaoEnum.Novo), Preco = 1700, PrecoDesconto = 1350.99, UsuarioId = 5, ItemTipoId = 6, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 11, Nome = "PS4", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Sony", Condicao = nameof(CondicaoEnum.Usado), Preco = 3500, PrecoDesconto = null, UsuarioId = 5, ItemTipoId = 6, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 12, Nome = "Guatona Kla", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Submundo dos deuses", Condicao = nameof(CondicaoEnum.Disfuncional), Preco = 10000, PrecoDesconto = 9999.99, UsuarioId = 5, ItemTipoId = 1, IsAtivo = 1, DataRegistro = dataAgora });

                // Itens do usuário @ateu (6);
                await context.Itens.AddAsync(new Item() { ItemId = 13, Nome = "Guitarra dos sonhos", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Shelter Nashville", Condicao = nameof(CondicaoEnum.Disfuncional), Preco = 3000, PrecoDesconto = null, UsuarioId = 6, ItemTipoId = 14, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 14, Nome = "Nike zika", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = "44", Marca = "Nike", Condicao = nameof(CondicaoEnum.Excelente), Preco = 890, PrecoDesconto = null, UsuarioId = 6, ItemTipoId = 12, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 15, Nome = "Palheta da Fender", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Fender", Condicao = nameof(CondicaoEnum.Excelente), Preco = 1, PrecoDesconto = 0.99, UsuarioId = 6, ItemTipoId = 14, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 16, Nome = "Apple Watch", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Apple", Condicao = nameof(CondicaoEnum.Excelente), Preco = 1500, PrecoDesconto = null, UsuarioId = 6, ItemTipoId = 17, IsAtivo = 1, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 17, Nome = "The Dark Side Of The Moon", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Pink Floyd", Condicao = nameof(CondicaoEnum.Excelente), Preco = 370.99, PrecoDesconto = null, UsuarioId = 6, ItemTipoId = 13, IsAtivo = 1, DataRegistro = dataAgora });
            }

            if (!await context.ItensImagens.AnyAsync())
            {
                // Itens do usuário @junioranheu (2);
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 1, CaminhoImagem = "1-1.webp", ItemId = 1, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 2, CaminhoImagem = "2-1.webp", ItemId = 2, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 3, CaminhoImagem = "3-1.webp", ItemId = 3, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 4, CaminhoImagem = "4-1.webp", ItemId = 4, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 5, CaminhoImagem = "5-1.webp", ItemId = 5, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 6, CaminhoImagem = "6-1.webp", ItemId = 6, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 7, CaminhoImagem = "6-2.webp", ItemId = 6, IsAtivo = 1, IsFotoPrincipal = 0, DataRegistro = dataAgora });

                // Itens do usuário @chaleco (5);
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 8, CaminhoImagem = "7-1.webp", ItemId = 7, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 9, CaminhoImagem = "8-1.webp", ItemId = 8, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 10, CaminhoImagem = "9-1.webp", ItemId = 9, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 11, CaminhoImagem = "10-1.webp", ItemId = 10, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 12, CaminhoImagem = "11-1.webp", ItemId = 11, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 13, CaminhoImagem = "12-1.webp", ItemId = 12, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 14, CaminhoImagem = "12-2.webp", ItemId = 12, IsAtivo = 1, IsFotoPrincipal = 0, DataRegistro = dataAgora });

                // Itens do usuário @ateu (6);
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 15, CaminhoImagem = "13-1.webp", ItemId = 13, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 16, CaminhoImagem = "14-1.webp", ItemId = 14, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 17, CaminhoImagem = "15-1.webp", ItemId = 15, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 18, CaminhoImagem = "16-1.webp", ItemId = 16, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 19, CaminhoImagem = "17-1.webp", ItemId = 17, IsAtivo = 1, IsFotoPrincipal = 1, DataRegistro = dataAgora });
            }
            #endregion

            #region seed_comentarios
            if (!await context.Comentarios.AnyAsync())
            {
                await context.Comentarios.AddAsync(new Comentario() { ComentarioId = 1, ItemId = 12, UsuarioId = 6, Mensagem = "Olá, quero comprar a guatona", DataMensagem = dataAgora, Resposta = null, DataResposta = null, IsAtivo = 1 });
                await context.Comentarios.AddAsync(new Comentario() { ComentarioId = 2, ItemId = 12, UsuarioId = 2, Mensagem = "Te dou 1 real por ela", DataMensagem = dataAgora, Resposta = "Não obrigado", DataResposta = null, IsAtivo = 1 });
            }
            #endregion

            await context.SaveChangesAsync();
        }
    }
}
