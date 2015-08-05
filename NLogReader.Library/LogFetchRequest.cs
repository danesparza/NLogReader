using System;

namespace NLogReader.Library
{
    /// <summary>
    /// Information about a log fetch request
    /// </summary>
    public class LogFetchRequest
    {
        public LogFetchRequest()
        {
            //  Default the end time to now
            EndDate = DateTime.Now;

            //  Default the page size:
            PageSize = 100;
        }

        /// <summary>
        /// Filters to just this application name
        /// </summary>
        public string ApplicationName { get; set; }

        /// <summary>
        /// Filters to just this machine name
        /// </summary>
        public string MachineName { get; set; }

        /// <summary>
        /// Filters results to just include this sessionid
        /// </summary>
        public string SessionId { get; set; }

        /// <summary>
        /// The requested number of items per results page
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// The requested result page
        /// </summary>
        public int Page { get; set; }

        /// <summary>
        /// The reqested start time
        /// </summary>
        public DateTime? StartDate { get; set; }

        /// <summary>
        /// The requested end time (defaults to now)
        /// </summary>
        public DateTime EndDate { get; set; }
    }
}
