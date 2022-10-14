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
            if (false)
            {
                await context.Database.EnsureDeletedAsync();
                await context.Database.EnsureCreatedAsync();

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
                await context.UsuariosTipos.AddAsync(new UsuarioTipo() { UsuarioTipoId = (int)UsuarioTipoEnum.Administrador, Tipo = nameof(UsuarioTipoEnum.Administrador), Descricao = "Administrador do sistema", IsAtivo = true, DataRegistro = dataAgora });
                await context.UsuariosTipos.AddAsync(new UsuarioTipo() { UsuarioTipoId = (int)UsuarioTipoEnum.Usuario, Tipo = GetDescricaoEnum(UsuarioTipoEnum.Usuario), Descricao = "Usuário comum", IsAtivo = true, DataRegistro = dataAgora });
                await context.UsuariosTipos.AddAsync(new UsuarioTipo() { UsuarioTipoId = (int)UsuarioTipoEnum.Loja, Tipo = nameof(UsuarioTipoEnum.Loja), Descricao = "Usuário dono ou administrador de alguma loja", IsAtivo = true, DataRegistro = dataAgora });
            }

            if (!await context.Usuarios.AnyAsync())
            {
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 1, NomeCompleto = "Administrador do GeekSpot", Email = "adm@Hotmail.com", NomeUsuarioSistema = "adm", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Administrador, Foto = "1.webp", IsAtivo = true, IsVerificado = false });
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 2, NomeCompleto = "Junior Souza", Email = "juninholorena@Hotmail.com", NomeUsuarioSistema = "junioranheu", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Usuario, Foto = "2.webp", IsAtivo = true, IsVerificado = true });
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 3, NomeCompleto = "Usuário Teste Loja", Email = "loja@Hotmail.com", NomeUsuarioSistema = "loja", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Loja, Foto = "4.webp", IsAtivo = true, IsVerificado = false });
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 4, NomeCompleto = "Israel Cabrera", Email = "chaleco@Hotmail.com", NomeUsuarioSistema = "chaleco", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Usuario, Foto = "5.webp", IsAtivo = true, IsVerificado = true });
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 5, NomeCompleto = "Marcelo Sallerno", Email = "ateu@Hotmail.com", NomeUsuarioSistema = "ateu", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Usuario, Foto = "6.webp", IsAtivo = true, IsVerificado = true });
                await context.Usuarios.AddAsync(new Usuario() { UsuarioId = 6, NomeCompleto = "Mariana Scalzaretto", Email = "mariana@Hotmail.com", NomeUsuarioSistema = "elfamscal", Senha = Criptografar("123"), DataRegistro = dataAgora, UsuarioTipoId = (int)UsuarioTipoEnum.Usuario, Foto = "7.webp", IsAtivo = true, IsVerificado = false });
            }

            if (!await context.UsuariosInformacoes.AnyAsync())
            {
                await context.UsuariosInformacoes.AddAsync(new UsuarioInformacao() { UsuarioInformacaoId = 1, UsuarioId = 2, DataAniversario = dataAgora, CPF = "44571955880", Telefone = "12 98271-3939", CEP = "12605110", Estado = "SP", Cidade = "Lorena", Bairro = "Vila Passos", Rua = "Rua das Laranjas", NumeroResidencia = "480", ReferenciaLocal = "Atrás da antiga fábrica G.A", DataUltimaAlteracao = null, LojinhaTitulo = "Lojinha Anheu", LojinhaDescricao = "Vendo tudo na metade do preço, só vem", LojinhaImagemCapa = "", LojinhaQtdEstrelas = null });
                await context.UsuariosInformacoes.AddAsync(new UsuarioInformacao() { UsuarioInformacaoId = 2, UsuarioId = 4, DataAniversario = dataAgora, CPF = "11111111111", Telefone = "12 99999-9999", CEP = "12606150", Estado = "SP", Cidade = "Lorena", Bairro = "Vila Passos", Rua = "Rua das Toranjas", NumeroResidencia = "481", ReferenciaLocal = "", DataUltimaAlteracao = null, LojinhaTitulo = "Lojinha do Chalequito", LojinhaDescricao = "Toy pal hoyo po weon", LojinhaImagemCapa = "", LojinhaQtdEstrelas = null });
                await context.UsuariosInformacoes.AddAsync(new UsuarioInformacao() { UsuarioInformacaoId = 3, UsuarioId = 5, DataAniversario = dataAgora, CPF = "22222222222", Telefone = "12 99999-9998", CEP = "12604440", Estado = "SP", Cidade = "Lorena", Bairro = "Vila Passos", Rua = "Rua das Maçãs", NumeroResidencia = "482", ReferenciaLocal = "", DataUltimaAlteracao = null, LojinhaTitulo = "Lojinha do Salerno", LojinhaDescricao = "Oi, né?", LojinhaImagemCapa = "", LojinhaQtdEstrelas = null });
            }

            if (!await context.UsuariosSeguir.AnyAsync())
            {
                await context.UsuariosSeguir.AddAsync(new UsuarioSeguir() { Id = 1, UsuarioSeguidoId = 4, UsuarioSeguidorId = 2, DataRegistro = dataAgora });
            }
            #endregion

            #region seed_itens
            if (!await context.ItensTipos.AnyAsync())
            {
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 1, Tipo = "Outros", Descricao = "Tudo que não se encaixou nos outros tipos tá aqui!", IsNovoTipo = true, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 2, Tipo = "Acessório gamer ou PC", Descricao = "Tá procurando uma placa de vídeo, teclado gamer ou algo do tipo? Tem aqui!", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 3, Tipo = "Action figure ou boneco", Descricao = "Bonecos super legais que são réplicas ou representações de grandes personagens de séries e filmes", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 4, Tipo = "CD, DVD ou Blu-ray", Descricao = "Discos de músicas ou vídeos — hoje em dia, muitas vezes, usados para ouvir/ver os clássicos", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 5, Tipo = "Jogo de cartas", Descricao = "Truco! Uno! 21!", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 6, Tipo = "Console", Descricao = "Bora jogar!", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 7, Tipo = "Cosplay", Descricao = "Kawaii desu", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 8, Tipo = "HQ ou mangá", Descricao = "Pros fãs de leitura", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 9, Tipo = "Jogo eletrônico", Descricao = "Bora jogar!", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 10, Tipo = "Livro", Descricao = "Pros fãs de leitura", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 11, Tipo = "Poster", Descricao = "Que tal enfeitar seu quarto com um poster bem da hora?", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 12, Tipo = "Vestuário", Descricao = "Para geeks com bom estilo", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 13, Tipo = "Música", Descricao = "Um geek sempre tem um bom gosto músical, né?", IsNovoTipo = true, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 14, Tipo = "Instrumentos musicais", Descricao = "Dó, ré, mi, fá...", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 15, Tipo = "Celular", Descricao = "Quero um iPhone 13!", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
                await context.ItensTipos.AddAsync(new ItemTipo() { ItemTipoId = 16, Tipo = "Relógio", Descricao = "Que horas são?", IsNovoTipo = false, IsAtivo = true, DataRegistro = dataAgora });
            }

            if (!await context.Itens.AnyAsync())
            {
                // Itens do usuário @junioranheu (2);
                await context.Itens.AddAsync(new Item() { ItemId = 1, Nome = "MacBook", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Apple", Condicao = nameof(CondicaoEnum.Excelente), Preco = 4000, PrecoDesconto = null, UsuarioId = 2, ItemTipoId = 2, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 2, Nome = "Coleção de livros do Harry Potter", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Warner Bros", Condicao = nameof(CondicaoEnum.Excelente), Preco = 120.99, PrecoDesconto = null, UsuarioId = 2, ItemTipoId = 10, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 3, Nome = "Poster do W.W.", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "NetFlix", Condicao = nameof(CondicaoEnum.Excelente), Preco = 149.99, PrecoDesconto = 99, UsuarioId = 2, ItemTipoId = 11, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 4, Nome = "Guitarra do Liam Gallagher", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Liam Gallagher", Condicao = nameof(CondicaoEnum.Usado), Preco = 12000, PrecoDesconto = 11.099, UsuarioId = 2, ItemTipoId = 14, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 5, Nome = "Controles de Xbox X e PS5", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Playstation e Microsoft", Condicao = nameof(CondicaoEnum.Excelente), Preco = 350, PrecoDesconto = 300, UsuarioId = 2, ItemTipoId = 2, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 6, Nome = "Bonequinhos do Harry Potter", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Warner Bros", Condicao = nameof(CondicaoEnum.Excelente), Preco = 80, PrecoDesconto = null, UsuarioId = 2, ItemTipoId = 3, IsAtivo = true, DataRegistro = dataAgora });

                // Itens do usuário @chaleco (4);
                await context.Itens.AddAsync(new Item() { ItemId = 7, Nome = "iPhone", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Apple", Condicao = nameof(CondicaoEnum.Excelente), Preco = 2000, PrecoDesconto = null, UsuarioId = 4, ItemTipoId = 15, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 8, Nome = "Violão acústico (baby)", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Shelby", Condicao = nameof(CondicaoEnum.Excelente), Preco = 1200, PrecoDesconto = null, UsuarioId = 4, ItemTipoId = 14, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 9, Nome = "Headset pro", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Razer", Condicao = nameof(CondicaoEnum.Excelente), Preco = 500, PrecoDesconto = 350, UsuarioId = 4, ItemTipoId = 2, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 10, Nome = "Nintendo Switch V2", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Nintendo", Condicao = nameof(CondicaoEnum.Novo), Preco = 1700, PrecoDesconto = 1350.99, UsuarioId = 4, ItemTipoId = 6, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 11, Nome = "PS4", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Sony", Condicao = nameof(CondicaoEnum.Usado), Preco = 3500, PrecoDesconto = null, UsuarioId = 4, ItemTipoId = 6, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 12, Nome = "Guatona Kla", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Submundo dos deuses", Condicao = nameof(CondicaoEnum.Disfuncional), Preco = 10000, PrecoDesconto = 9999.99, UsuarioId = 4, ItemTipoId = 1, IsAtivo = true, DataRegistro = dataAgora });

                // Itens do usuário @ateu (5);
                await context.Itens.AddAsync(new Item() { ItemId = 13, Nome = "Guitarra dos sonhos", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Shelter Nashville", Condicao = nameof(CondicaoEnum.Disfuncional), Preco = 3000, PrecoDesconto = null, UsuarioId = 5, ItemTipoId = 14, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 14, Nome = "Nike zika", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = "44", Marca = "Nike", Condicao = nameof(CondicaoEnum.Excelente), Preco = 890, PrecoDesconto = null, UsuarioId = 5, ItemTipoId = 12, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 15, Nome = "Palheta da Fender", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Fender", Condicao = nameof(CondicaoEnum.Excelente), Preco = 1, PrecoDesconto = 0.99, UsuarioId = 5, ItemTipoId = 14, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 16, Nome = "Apple Watch", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Apple", Condicao = nameof(CondicaoEnum.Excelente), Preco = 1500, PrecoDesconto = null, UsuarioId = 5, ItemTipoId = 16, IsAtivo = true, DataRegistro = dataAgora });
                await context.Itens.AddAsync(new Item() { ItemId = 17, Nome = "The Dark Side Of The Moon", Descricao = LoremIpsum(10, 40, 1, 3, 1, false), Tamanho = null, Marca = "Pink Floyd", Condicao = nameof(CondicaoEnum.Excelente), Preco = 370.99, PrecoDesconto = null, UsuarioId = 5, ItemTipoId = 13, IsAtivo = true, DataRegistro = dataAgora });
            }

            if (!await context.ItensImagens.AnyAsync())
            {
                // Itens do usuário @junioranheu (2);
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 1, CaminhoImagem = "1-1.webp", ItemId = 1, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 2, CaminhoImagem = "2-1.webp", ItemId = 2, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 3, CaminhoImagem = "3-1.webp", ItemId = 3, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 4, CaminhoImagem = "4-1.webp", ItemId = 4, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 5, CaminhoImagem = "5-1.webp", ItemId = 5, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 6, CaminhoImagem = "6-1.webp", ItemId = 6, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 7, CaminhoImagem = "6-2.webp", ItemId = 6, IsAtivo = true, IsFotoPrincipal = false, DataRegistro = dataAgora });

                // Itens do usuário @chaleco (4);
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 8, CaminhoImagem = "7-1.webp", ItemId = 7, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 9, CaminhoImagem = "8-1.webp", ItemId = 8, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 10, CaminhoImagem = "9-1.webp", ItemId = 9, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 11, CaminhoImagem = "10-1.webp", ItemId = 10, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 12, CaminhoImagem = "11-1.webp", ItemId = 11, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 13, CaminhoImagem = "12-1.webp", ItemId = 12, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 14, CaminhoImagem = "12-2.webp", ItemId = 12, IsAtivo = true, IsFotoPrincipal = false, DataRegistro = dataAgora });

                // Itens do usuário @ateu (5);
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 15, CaminhoImagem = "13-1.webp", ItemId = 13, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 16, CaminhoImagem = "14-1.webp", ItemId = 14, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 17, CaminhoImagem = "15-1.webp", ItemId = 15, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 18, CaminhoImagem = "16-1.webp", ItemId = 16, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
                await context.ItensImagens.AddAsync(new ItemImagem() { ItemImagemId = 19, CaminhoImagem = "17-1.webp", ItemId = 17, IsAtivo = true, IsFotoPrincipal = true, DataRegistro = dataAgora });
            }
            #endregion

            #region seed_comentarios
            if (!await context.Comentarios.AnyAsync())
            {
                await context.Comentarios.AddAsync(new Comentario() { ComentarioId = 1, ItemId = 12, UsuarioId = 4, Mensagem = "Olá, quero comprar a guatona", DataMensagem = dataAgora, Resposta = null, DataResposta = null, IsAtivo = true });
                await context.Comentarios.AddAsync(new Comentario() { ComentarioId = 2, ItemId = 12, UsuarioId = 2, Mensagem = "Te dou 1 real por ela", DataMensagem = dataAgora, Resposta = "Não obrigado", DataResposta = null, IsAtivo = true });
            }
            #endregion

            #region seed_ajudas
            if (!await context.AjudasTopicos.AnyAsync())
            {
                await context.AjudasTopicos.AddAsync(new AjudaTopico() { AjudaTopicoId = 1, Topico = "Sobre o GeekSpot", Descricao = "Você é novo por aqui? Seja bem-vindo! Aprenda sobre nós, nossa política de privacidade, termos de uso e mais", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasTopicos.AddAsync(new AjudaTopico() { AjudaTopicoId = 2, Topico = "Sobre o GeekSpot <b>Pro<b/>", Descricao = "Saiba mais sobre o que é o GeekSpot Pro e suas vantagens", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasTopicos.AddAsync(new AjudaTopico() { AjudaTopicoId = 3, Topico = "Trocas", Descricao = "Trocar é um processo simples aqui no GeekSpot. Descubra como é feito!", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasTopicos.AddAsync(new AjudaTopico() { AjudaTopicoId = 4, Topico = "Compras", Descricao = "Comprar no GeekSpot é fácil! Veja como aqui", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasTopicos.AddAsync(new AjudaTopico() { AjudaTopicoId = 5, Topico = "Vendas", Descricao = "Tire todas as suas dúvidas sobre como as compras são feitas no GeekSpot", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasTopicos.AddAsync(new AjudaTopico() { AjudaTopicoId = 6, Topico = "Configuração de conta", Descricao = "Deseja alterar os dados do seu cadastro? Sua conta foi bloqueada? Veja aqui!", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasTopicos.AddAsync(new AjudaTopico() { AjudaTopicoId = 7, Topico = "Segurança da informação", Descricao = "Quer saber mais sobre dicas de segurança e como fazemos para proteger seus dados?", DataRegistro = dataAgora, IsAtivo = true });
            }

            if (!await context.AjudasItens.AnyAsync())
            {
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 1, AjudaTopicoId = 1, Titulo = "O GeekSpot", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 2, AjudaTopicoId = 1, Titulo = "O GeekSpot Pro", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 3, AjudaTopicoId = 1, Titulo = "Política de privacidade e termos de uso do GeekSpot", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 4, AjudaTopicoId = 1, Titulo = "Horário de atendimento", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 5, AjudaTopicoId = 1, Titulo = "Segurança", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });

                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 6, AjudaTopicoId = 2, Titulo = "Como participar do GeekSpot Pro", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 7, AjudaTopicoId = 2, Titulo = "Quais as vantagens?", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 8, AjudaTopicoId = 2, Titulo = "Quero alterar meu anúncio", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 9, AjudaTopicoId = 2, Titulo = "Descontos e taxas", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 10, AjudaTopicoId = 2, Titulo = "Quero sair do GeekSpot Pro", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 11, AjudaTopicoId = 2, Titulo = "Quanto tempo meus itens ficam no modo Pro?", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });

                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 12, AjudaTopicoId = 3, Titulo = "Contato com o geek que está trocando comigo", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 13, AjudaTopicoId = 3, Titulo = "Entregas e prazos", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 14, AjudaTopicoId = 3, Titulo = "Serviço de proteção", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 15, AjudaTopicoId = 3, Titulo = "Cancelamento", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 16, AjudaTopicoId = 3, Titulo = "Devolução e reembolso", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 17, AjudaTopicoId = 3, Titulo = "Denunciar ou reportar abusos", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });

                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 18, AjudaTopicoId = 4, Titulo = "Contato com o geek ou loja que está vendendo para mim", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 19, AjudaTopicoId = 4, Titulo = "Entregas e prazos", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 20, AjudaTopicoId = 4, Titulo = "Serviço de proteção", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 21, AjudaTopicoId = 4, Titulo = "Cancelamento", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 22, AjudaTopicoId = 4, Titulo = "Devolução e reembolso", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 23, AjudaTopicoId = 4, Titulo = "Denunciar ou reportar abusos", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });

                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 24, AjudaTopicoId = 5, Titulo = "Contato com o geek para quem estou vendendo", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 25, AjudaTopicoId = 5, Titulo = "Entregas e prazos", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 26, AjudaTopicoId = 5, Titulo = "Serviço de proteção", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 27, AjudaTopicoId = 5, Titulo = "Cancelamento", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 28, AjudaTopicoId = 5, Titulo = "Devolução e reembolso", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 29, AjudaTopicoId = 5, Titulo = "Denunciar ou reportar abusos", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });

                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 30, AjudaTopicoId = 6, Titulo = "Criar uma conta", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 31, AjudaTopicoId = 6, Titulo = "Editar meus dados", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 32, AjudaTopicoId = 6, Titulo = "E-mail", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 33, AjudaTopicoId = 6, Titulo = "Notificações", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 34, AjudaTopicoId = 6, Titulo = "Desativar ou reativar meus itens", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 35, AjudaTopicoId = 6, Titulo = "Excluir minha conta", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 36, AjudaTopicoId = 6, Titulo = "Lei geral de proteção de dados (LGPD)", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });

                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 37, AjudaTopicoId = 7, Titulo = "Identificando uma página falsa", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 38, AjudaTopicoId = 7, Titulo = "Transação de dados", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 39, AjudaTopicoId = 7, Titulo = "Fraudes: como posso evitar?", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 40, AjudaTopicoId = 7, Titulo = "Como aumentar a segurança na minha transação?", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
                await context.AjudasItens.AddAsync(new AjudaItem() { AjudaItemId = 41, AjudaTopicoId = 7, Titulo = "Lei geral de proteção de dados (LGPD)", ConteudoHtml = $"{LoremIpsum(GerarNumeroAleatorio(70, 100), GerarNumeroAleatorio(250, 300), GerarNumeroAleatorio(3, 5), GerarNumeroAleatorio(7, 10), GerarNumeroAleatorio(1, 3), true)}", DataRegistro = dataAgora, IsAtivo = true });
            }
            #endregion

            await context.SaveChangesAsync();
        }
    }
}
