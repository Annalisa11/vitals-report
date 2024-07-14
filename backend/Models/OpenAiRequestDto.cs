using System.Text.Json.Serialization;

namespace backend.Models
{
    public class OpenAiRequestDto
    {
        [JsonPropertyName("prompt")]
        public string? Prompt { get; set; }
    }
}
