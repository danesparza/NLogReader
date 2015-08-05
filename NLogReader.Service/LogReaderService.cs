using System;
using System.Configuration;
using System.ServiceProcess;
using Microsoft.Owin.Hosting;

namespace NLogReader.Service
{
    public partial class LogReaderService : ServiceBase
    {
        /// <summary>
        /// The name/port this service will be listening on
        /// </summary>
        public string listeningOn = string.Empty;

        private IDisposable _server = null;

        public LogReaderService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            //  Read the base address from configuration:
            listeningOn = ConfigurationManager.AppSettings["listeningOn"];

            _server = WebApp.Start<Startup>(url: listeningOn);
        }

        protected override void OnStop()
        {
            if(_server != null)
            {
                _server.Dispose();
            }
            base.OnStop();
        }
    }
}
