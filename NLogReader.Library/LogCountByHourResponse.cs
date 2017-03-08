using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NLogReader.Library
{
    public class LogCountByHourResponse
    {
        public int Month { get; set; }
        public int Day { get; set; }
        public int Hour { get; set; }

        public int TraceCount { get; set; }
        public int DebugCount { get; set; }
        public int InfoCount { get; set; }
        public int WarnCount { get; set; }
        public int ErrorCount { get; set; }
        public int FatalCount { get; set; }
    }
}

