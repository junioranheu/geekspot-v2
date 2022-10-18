using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Authentication;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Infraestructure.Authentication;
using GeekSpot.Infraestructure.AutoMapper;
using GeekSpot.Infraestructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace GeekSpot.Infraestructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfraestructure(this IServiceCollection services, WebApplicationBuilder builder)
        {
            ConfigurationManager configuration = builder.Configuration;

            // =-=-=-=-=-=-=-=-=-= Configuração do JWT =-=-=-=-=-=-=-=-=-=
            services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));

            // =-=-=-=-=-=-=-=-=-= Configuração de depêndencia do AutoMapper =-=-=-=-=-=-=-=-=-=
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperConfig());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            // =-=-=-=-=-=-=-=-=-= Serviços =-=-=-=-=-=-=-=-=-=
            services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();

            // Interfaces e repositórios;
            services.AddScoped<ISistemaRepository, SistemaRepository>();
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<IAjudaTopicoRepository, AjudaTopicoRepository>();
            services.AddScoped<IAjudaItemRepository, AjudaItemRepository>();

            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IUsuarioSeguirRepository, UsuarioSeguirRepository>();

            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IItemTipoRepository, ItemTipoRepository>();

            services.AddScoped<IComentarioRepository, ComentarioRepository>();

            // =-=-=-=-=-=-=-=-=-= Autenticação JWT para a API: https://balta.io/artigos/aspnet-5-autenticacao-autorizacao-bearer-jwt =-=-=-=-=-=-=-=-=-=
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = !builder.Environment.IsDevelopment();
                x.SaveToken = true;
                x.IncludeErrorDetails = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["JwtSettings:Secret"])),
                    ValidateIssuer = true,
                    ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration["JwtSettings:Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                //// No erro do Authorize 401;
                //x.Events = new JwtBearerEvents
                //{
                //    OnChallenge = async (context) =>
                //    {
                //        if (context.AuthenticateFailure != null && context.AuthenticateFailure.GetType() == typeof(SecurityTokenExpiredException))
                //        {
                //            var token = context.Request.Cookies[tokenName];
                //            var refreshToken = context.Request.Cookies[refreshTokenName];
                //            var authService = services.BuildServiceProvider().GetService<IAutenticarService>();
                //            var usuarioDTO = await authService.RefreshToken(token, refreshToken);

                //            // Atualizar o refresh token;
                //            var cookieOptionsToken = new CookieOptions { HttpOnly = true, Expires = HorarioBrasilia().AddHours(Convert.ToDouble(tokenExpiryMinutes)) };
                //            context.Response.Cookies.Append(tokenName, usuarioDTO.Token, cookieOptionsToken);

                //            var cookieOptionsTokenRefreshToken = new CookieOptions { HttpOnly = true, Expires = HorarioBrasilia().AddHours(Convert.ToDouble(refreshTokenExpiryMinutes)) };
                //            context.Response.Cookies.Append(refreshTokenName, usuarioDTO.RefreshToken, cookieOptionsTokenRefreshToken);

                //            context.HandleResponse();
                //            context.Response.StatusCode = 401;
                //            context.Response.ContentType = "application/json";

                //            var result = JsonConvert.SerializeObject(new
                //            {
                //                token = usuarioDTO.Token,
                //                isRefreshToken = true
                //            });

                //            await context.Response.WriteAsync(result);
                //        }

                //        await Task.CompletedTask;
                //    }
                //};
            });

            return services;
        }
    }
}
