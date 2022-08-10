using GeekSpot.Application.Common.Interfaces.Authentication;
using GeekSpot.Application.Services.Authentication;
using Microsoft.Extensions.DependencyInjection;

namespace GeekSpot.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IAutenticarService, AutenticarService>();

            return services;
        }
    }
}
