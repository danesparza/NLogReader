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
    }
}
