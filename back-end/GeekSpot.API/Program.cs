using GeekSpot.API.Data;
using GeekSpot.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ----------------------------------------------------- Services -----------------------------------------------------

// Habilitar API por IP em vez de apenas localhost: https://stackoverflow.com/questions/69532898/asp-net-core-6-0-kestrel-server-is-not-working;
// Habilitar para desenvolvimento mobile;
if (builder.Environment.IsDevelopment())
{
    //builder.WebHost.ConfigureKestrel(options =>
    //{
    //    // Exemplo: https://192.168.8.211:7225/api/Usuarios/1, https://192.168.8.214:7225/api/Usuarios/1 
    //    options.ListenAnyIP(7225, c => c.UseHttps());
    //    options.ListenAnyIP(7226);
    //});
}

// Swagger;
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "GeekSpot", Version = "v1" });

    // https://stackoverflow.com/questions/43447688/setting-up-swagger-asp-net-core-using-the-authorization-headers-bearer
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        Scheme = "bearer",
        BearerFormat = "JWT",
        Name = "JWT Authentication",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Description = "Coloque **_apenas_** o token (JWT Bearer) abaixo!",

        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { jwtSecurityScheme, Array.Empty<string>() }
    });
});

// Inserir as informações do banco na variável builder antes de buildá-la;
var secretSenhaBancoDados = builder.Configuration["SecretSenhaBancoDados"]; // secrets.json;
string con = builder.Configuration.GetConnectionString("BaseDadosGeekSpot");
con = con.Replace("[secretSenhaBancoDados]", secretSenhaBancoDados); // Alterar pela senha do secrets.json;
builder.Services.AddDbContext<Context>(options => options.UseMySql(con, ServerVersion.AutoDetect(con)));

// Banco (injection) com o Pattern Design: https://www.c-sharpcorner.com/blogs/net-core-mvc-with-entity-framework-core-using-dependency-injection-and-repository
// NOVOS REPOSITÓRIOS DEVEM SEMPRE SER ADICIONADOS AQUI;
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IItemCategoriaRepository, ItemCategoriaRepository>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();

// Cors;
builder.Services.AddCors(options =>
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials();
    })
);

// Outros;
builder.Services.AddMvc();

// Autenticação JWT para a API: https://balta.io/artigos/aspnet-5-autenticacao-autorizacao-bearer-jwt;
var key = Encoding.ASCII.GetBytes(Chave.chave);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// Etc (padrão);
// Adicionar comando "AddNewtonsoftJson" para ignorar "erros" de object cycle - https://stackoverflow.com/questions/59199593/net-core-3-0-possible-object-cycle-was-detected-which-is-not-supported;
// E também formatar o resultado JSON retornado pelas APIs;
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
});

// Verificando a disponibilidade dos bancos de dados da aplicação através de Health Checks: https://www.treinaweb.com.br/blog/verificando-a-integridade-da-aplicacao-asp-net-core-com-health-checks
builder.Services.AddHealthChecks();

// SignalR: https://medium.com/swlh/creating-a-simple-real-time-chat-with-net-core-reactjs-and-signalr-6367dcadd2c6
// Para um bom funcionamento, deve-se ativar a opção de web sockets no Azure: https://azure.microsoft.com/pt-br/blog/introduction-to-websockets-on-windows-azure-web-sites/
builder.Services.AddSignalR();

// ----------------------------------------------------- APP -----------------------------------------------------

var app = builder.Build();

// Iniciar banco;
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var context = services.GetRequiredService<Context>();

        // Iniciar o banco de dados, indo para o DbInitializer.cs;
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        string erroBD = ex.Message.ToString();
    }
}

// Configure the HTTP request pipeline;
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "GeekSpot v1");
    c.DocExpansion(DocExpansion.None); // https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/279
}
);
//}

// Cors;
app.UseCors("CorsPolicy");

// SignalR: https://medium.com/swlh/creating-a-simple-real-time-chat-with-net-core-reactjs-and-signalr-6367dcadd2c6
// app.MapHub<ChatHub>("/hubs/chathub");

// Ativa o HealthChecks;
app.UseHealthChecks("/status");

// Redirecionar sempre para HTTPS;
if (app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

// Outros;
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Exibir erros;
//if (app.Environment.IsDevelopment())
//{
app.UseDeveloperExceptionPage();
//}

// Habilitar static files para exibir as imagens da API: https://youtu.be/jSO5KJLd5Qk?t=86;
IWebHostEnvironment env = app.Environment;
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Upload")),
    RequestPath = "/Upload",

    // CORS: https://stackoverflow.com/questions/61152499/dotnet-core-3-1-cors-issue-when-serving-static-image-files;
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
        ctx.Context.Response.Headers.Append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
});

app.Run();

// Deixar o Program.cs public para o xUnit;
public partial class Program { }
