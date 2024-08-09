using System.Text.Json.Serialization;

namespace backend.Models
{
    public class JokeFromJokeApiDto
    {
        [JsonPropertyName("type")]
        public required string Type { get; set; }

        [JsonPropertyName("setup")]
        public required string Setup { get; set; }

        [JsonPropertyName("punchline")]
        public required string Punchline { get; set; }
    }
}
