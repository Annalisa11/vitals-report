using System.Text.Json.Serialization;

namespace backend.Models
{
    public sealed class VitalsDto   
    {
        [JsonPropertyName("timestamp")]
        public string Timestamp { get; set; }

        [JsonPropertyName("valueInMgPerDl")]
        public int ValueInMgPerDl { get; set; }

        [JsonPropertyName("trendArrow")]
        public int TrendArrow { get; set; }

        [JsonPropertyName("trendMessage")]
        public string TrendMessage { get; set; }

        [JsonPropertyName("measurementColor")]
        public int MeasurementColor { get; set; }

        [JsonPropertyName("glucoseUnits")]
        public int GlucoseUnits { get; set; }

        [JsonPropertyName("value")]
        public int Value { get; set; } 
    }
}
