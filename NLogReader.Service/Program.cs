using System.ServiceProcess;

namespace NLogReader.Service
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main()
        {
            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[] 
            { 
                new LogReaderService() 
            };
            ServiceBase.Run(ServicesToRun);
        }
    }
}
