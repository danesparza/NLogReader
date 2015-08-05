
namespace NLogReader.Library
{
    public class VersionResponse
    {
        public VersionResponse()
        {
            this.BuildHtml = "Not available";
        }

        public string BuildHtml { get; set; }
        public string AssemblyVersion { get; set; }
    }
}
