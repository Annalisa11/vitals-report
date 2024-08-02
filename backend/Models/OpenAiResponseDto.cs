using System.Text.Json.Serialization;

namespace backend.Models
{
    public class OpenAiResponseDto
    {
        [JsonPropertyName("headline")]
        public required string Headline { get; set; }

        [JsonPropertyName("comment")]
        public required string Comment { get; set; }
    }
}
