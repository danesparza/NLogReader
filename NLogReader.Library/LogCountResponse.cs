namespace NLogReader.Library
{
    public class LogCountResponse
    {
        public string Application { get; set; }

        public int TotalCount { get; set; }
        public int TraceCount { get; set; }
        public int DebugCount { get; set; }
        public int InfoCount { get; set; }
        public int WarnCount { get; set; }
        public int ErrorCount { get; set; }
        public int FatalCount { get; set; }
    }
}
