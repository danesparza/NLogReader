using System.Collections.Generic;
using NLogReader.Library.Data;

namespace NLogReader.Library
{
    /// <summary>
    /// A log fetch response message
    /// </summary>
    public class LogFetchResponse
    {
        /// <summary>
        /// The total number of log items that fit the request parameters.  This number may
        /// be larger than the page size.  If it is, there is more data available on subsequent 
        /// pages
        /// </summary>
        public int TotalCount { get; set; }

        /// <summary>
        /// The total number of log items included in the response page
        /// </summary>
        public int Count { get; set; }

        /// <summary>
        /// The list of log items returned
        /// </summary>
        public List<system_logging> Data { get; set; }
    }
}
