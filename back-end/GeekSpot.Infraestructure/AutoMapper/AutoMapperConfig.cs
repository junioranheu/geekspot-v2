using AutoMapper;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;

namespace GeekSpot.Infraestructure.AutoMapper
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            // Usuário;
            CreateMap<UsuarioTipo, UsuarioTipoDTO>().ReverseMap();
            CreateMap<Usuario, UsuarioDTO>().ReverseMap();
            CreateMap<Usuario, UsuarioSenhaDTO>().ReverseMap();
            CreateMap<UsuarioInformacao, UsuarioInformacaoDTO>().ReverseMap();
            CreateMap<UsuarioSenhaDTO, UsuarioDTO>().ReverseMap();

            // Logradouro;
            CreateMap<Estado, EstadoDTO>().ReverseMap();
            CreateMap<Cidade, CidadeDTO>().ReverseMap();

            // Item;
            CreateMap<ItemTipo, ItemTipoDTO>().ReverseMap();
            CreateMap<Item, ItemDTO>().ReverseMap();
            CreateMap<ItemImagem, ItemImagemDTO>().ReverseMap();

            // Comentário;
            CreateMap<Comentario, ComentarioDTO>().ReverseMap();
        }
    }
}
