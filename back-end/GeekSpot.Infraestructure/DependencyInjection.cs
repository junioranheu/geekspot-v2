using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Authentication;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Application.Common.Interfaces.Services;
using GeekSpot.Infraestructure.Authentication;
using GeekSpot.Infraestructure.AutoMapper;
using GeekSpot.Infraestructure.Persistence;
using GeekSpot.Infraestructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GeekSpot.Infraestructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfraestructure(this IServiceCollection services, ConfigurationManager configuration)
        {
            // Configuração do JWT;
            services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));

            // Configuração de depêndencia do AutoMapper;
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperConfig());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            // Serviços;
            services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
            services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

            // Interfaces e repositórios;
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IItemTipoRepository, ItemTipoRepository>();

            return services;
        }
    }
}
