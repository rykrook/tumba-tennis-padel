var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
builder.Services.AddMemoryCache();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

var projectId = builder.Configuration["Sanity:ProjectId"] ?? Environment.GetEnvironmentVariable("Sanity__ProjectId");

app.MapGet("/", () => "Tumba Tennis API – Swagger: /swagger");
app.MapGet("/api/trainers", async (HttpClient http) => {
  var query = Uri.EscapeDataString("*[_type == \"tranareStyrelsen\"][0].people[]{name, role, bio, \"image\": image.asset->url}");
  var res = await http.GetFromJsonAsync<dynamic>($"https://{projectId}.api.sanity.io/v2024-01-01/data/query/production?query={query}");
  return Results.Ok(res?.result ?? new object[0]);
});

app.MapGet("/api/schedule", async (HttpClient http) => {
  var query = Uri.EscapeDataString("*[_type == \"traningsdagar\"][0].schedule");
  var res = await http.GetFromJsonAsync<dynamic>($"https://{projectId}.api.sanity.io/v2024-01-01/data/query/production?query={query}");
  return Results.Ok(res?.result ?? new object[0]);
});

app.MapPost("/api/contact", async (HttpContext ctx) => {
  // Här kan du lägga till SendGrid senare
  return Results.Ok(new { message = "Tack för ditt meddelande!" });
});

app.Run();