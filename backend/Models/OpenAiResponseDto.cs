using System.Text.Json.Serialization;

namespace backend.Models
{
    public class OpenAiResponseDto
    {
        [JsonPropertyName("message")]
        public string? Message { get; set; }

        [JsonPropertyName("headline")]
        public string? Headline { get; set; }
    }
}
