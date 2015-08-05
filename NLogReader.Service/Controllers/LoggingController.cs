using System.IO;
using System.Web.Http;
using System.Web.Http.Cors;
using NLogReader.Library;

namespace NLogReader.Service.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/v1/logs")]
    public class LoggingController : ApiController
    {
        /// <summary>
        /// Gets service build information
        /// </summary>
        /// <returns></returns>
        [Route("version")]
        public VersionResponse GetVersion()
        {
            //  Our return value:
            VersionResponse version = new VersionResponse();

            //  Try to get the assembly version information:
            version.AssemblyVersion = System.Reflection.Assembly.GetExecutingAssembly().GetName().Version.ToString();

            //  Try to get the build.html file if it's in the same directory:
            if(File.Exists(System.AppDomain.CurrentDomain.BaseDirectory + "build.html"))
            {
                version.BuildHtml = File.ReadAllText(System.AppDomain.CurrentDomain.BaseDirectory + "build.html").Trim();
            }

            return version;
        }

        /// <summary>
        /// Gets the most recent log items
        /// </summary>
        /// <returns></returns>
        [Route("getlatest")]
        public LogFetchResponse GetLatestLogItems()
        {
            using(var db = new NLogReader.Library.Data.Application_LogsEntities())
            {
                LogDataManager manager = new LogDataManager(db);
                return manager.GetLogItems(new LogFetchRequest());
            }
        }

        /// <summary>
        /// Gets the requested log information
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("get")]
        public LogFetchResponse GetLogItems([FromBody] LogFetchRequest request)
        {
            using(var db = new NLogReader.Library.Data.Application_LogsEntities())
            {
                LogDataManager manager = new LogDataManager(db);
                return manager.GetLogItems(request);
            }
        }
    }
}
