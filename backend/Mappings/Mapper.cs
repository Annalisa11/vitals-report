using backend.Models;

namespace backend.Mappings
{
    public static class Mapper
    {
        public static JokeDto MapToJokeDto(JokeFromJokeApiDto joke)
        {
            return new JokeDto()
            {
                Type = joke.Type,
                Setup = joke.Setup,
                Punchline = joke.Punchline,
            };
        }

        public static VitalsDto MapToVitalsDto(VitalsFromDavidDto vitals)
        {
            return new VitalsDto
            {
                GlucoseUnits = vitals.GlucoseUnits,
                MeasurementColor = vitals.MeasurementColor,
                Timestamp = vitals.Timestamp,
                TrendMessage = vitals.TrendMessage,
                Value = vitals.Value,
                ValueInMgPerDl = vitals.ValueInMgPerDl
            };
        }
    }
}
