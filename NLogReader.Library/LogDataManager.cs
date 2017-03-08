using System;
using System.Collections.Generic;
using System.Linq;
using NLogReader.Library.Data;

namespace NLogReader.Library
{
    /// <summary>
    /// LogDataManager provides methods to get log data
    /// </summary>
    public class LogDataManager
    {
        private Application_LogsEntities _context;

        public LogDataManager(Application_LogsEntities context)
        {
            _context = context;
        }

        /// <summary>
        /// GetLogItems fetches log items according to the request parameters provided
        /// </summary>
        /// <param name="request">The request parameters</param>
        /// <returns></returns>
        public LogFetchResponse GetLogItems(LogFetchRequest request)
        {
            //  Our return result
            LogFetchResponse result = new LogFetchResponse();

            //  Our placeholder result list
            List<system_logging> logitems = new List<system_logging>();

            //  The base query just gets information from the log table
            var query = from items in _context.system_logging
                        select items;

            //  If we have an application, filter on it
            if(!string.IsNullOrEmpty(request.ApplicationName))
            {
                query = query.Where(q => q.log_application == request.ApplicationName);
            }

            //  If we have an aspnet sessionid, filter on it
            if(!string.IsNullOrEmpty(request.SessionId))
            {
                query = query.Where(q => q.aspnet_sessionid == request.SessionId);
            }

            //  If we have a machine name, filter on it
            if(!string.IsNullOrEmpty(request.MachineName))
            {
                query = query.Where(q => q.log_machine_name == request.MachineName);
            }

            //  If we have a start date, filter on it:
            if(request.StartDate.HasValue)
            {
                query = query.Where(q => q.entered_date > request.StartDate);
            }

            //  Filter on the end date:
            query = query.Where(q => q.entered_date < request.EndDate);

            //  Order and get a count of the entire set
            query = query.OrderByDescending(item => item.entered_date);
            var totalcount = query.Count();

            //  Filter on page number & size:
            query = query.Skip(request.Page * request.PageSize).Take(request.PageSize);

            //  Execute the query and set the results:
            logitems = query.ToList();
            var resultcount = query.Count();

            result = new LogFetchResponse()
            {
                TotalCount = totalcount,
                Count = resultcount,
                Data = logitems
            };

            return result;
        }

        /// <summary>
        /// Gets a list of all applications in the system
        /// </summary>
        /// <returns></returns>
        public List<string> GetAllApplications()
        {
            //  Our return result
            List<string> retval = new List<string>();

            //  Get our list of applications:
            retval = (from items in _context.system_logging
                      orderby items.log_application
                      select items.log_application).Distinct().ToList();

            return retval;
        }

        /// <summary>
        /// Get log counts for all applications in the system
        /// </summary>
        /// <returns></returns>
        public List<LogCountByApplicationResponse> GetApplicationLogCounts()
        {
            List<LogCountByApplicationResponse> retval = new List<LogCountByApplicationResponse>();

            //  Get the list of applications and each of their log counts:
            retval = (from logitem in _context.system_logging
                      orderby logitem.log_application
                      group logitem by logitem.log_application into grp
                      select new LogCountByApplicationResponse
                      {
                          Application = grp.Key,
                          TotalCount = grp.Count(),
                          TraceCount = grp.Where(x => x.log_level == "Trace").Count(),
                          DebugCount = grp.Where(x => x.log_level == "Debug").Count(),
                          InfoCount = grp.Where(x => x.log_level == "Info").Count(),
                          WarnCount = grp.Where(x => x.log_level == "Warn").Count(),
                          ErrorCount = grp.Where(x => x.log_level == "Error").Count(),
                          FatalCount = grp.Where(x => x.log_level == "Fatal").Count()
                      }).ToList();

            return retval;
        }

        /// <summary>
        /// Get the hourly log counts for the specified number of days in the past
        /// </summary>
        /// <param name="daysToFetch">The number of days in the past to fetch data for</param>
        /// <returns></returns>
        public List<LogCountByHourResponse> GetHourlyLogCounts(int daysToFetch = 14)
        {
            List<LogCountByHourResponse> retval = new List<LogCountByHourResponse>();

            DateTime nowMinusXDays = DateTime.Now.AddDays(-(daysToFetch));

            //  Get the list of applications and each of their log counts:
            retval = (from logitem in _context.system_logging
                      where logitem.entered_date > nowMinusXDays
                      group logitem by new {Year = logitem.entered_date.Value.Year, Month = logitem.entered_date.Value.Month, Day = logitem.entered_date.Value.Day, Hour = logitem.entered_date.Value.Hour} into grp
                      orderby grp.Key.Month, grp.Key.Day, grp.Key.Hour
                      select new LogCountByHourResponse
                      {
                          Year = grp.Key.Year,
                          Month = grp.Key.Month,
                          Day = grp.Key.Day,
                          Hour = grp.Key.Hour,
                          TraceCount = grp.Where(x => x.log_level.Equals("Trace", StringComparison.CurrentCultureIgnoreCase)).Count(),
                          DebugCount = grp.Where(x => x.log_level.Equals("Debug", StringComparison.CurrentCultureIgnoreCase)).Count(),
                          InfoCount = grp.Where(x => x.log_level.Equals("Info", StringComparison.CurrentCultureIgnoreCase)).Count(),
                          WarnCount = grp.Where(x => x.log_level.Equals("Warn", StringComparison.CurrentCultureIgnoreCase)).Count(),
                          ErrorCount = grp.Where(x => x.log_level.Equals("Error", StringComparison.CurrentCultureIgnoreCase)).Count(),
                          FatalCount = grp.Where(x => x.log_level.Equals("Fatal", StringComparison.CurrentCultureIgnoreCase)).Count()
                      }).ToList();

            return retval;
        }
    }
}
