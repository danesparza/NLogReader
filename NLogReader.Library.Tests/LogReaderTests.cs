using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NLogReader.Library.Data;

namespace NLogReader.Library.Tests
{
    [TestClass]
    public class LogReaderTests
    {
        /// <summary>
        /// Our returned data
        /// </summary>
        private IQueryable<system_logging> data = null;

        /// <summary>
        /// Our mocked dbset
        /// </summary>
        private Mock<DbSet<system_logging>> mockSet = new Mock<DbSet<system_logging>>();

        /// <summary>
        /// Our mocked database context
        /// </summary>
        private Mock<Application_LogsEntities> mockContext = new Mock<Application_LogsEntities>();

        [TestInitialize]
        public void Test_Setup()
        {
            //  Our test data
            data = new List<system_logging>
            {
                new system_logging { entered_date = DateTime.Now.AddSeconds(-1), log_application = "Application web", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "UnitTEST1234567890" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-2), log_application = "Application web", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "UnitTEST1234567890" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-3), log_application = "Application web", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "UnitTEST1234567890" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-4), log_application = "Other Service", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-4), log_application = "Other Service", log_machine_name = "APP01", log_level = "ERROR", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-5), log_application = "Other Service", log_machine_name = "APP01", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-6), log_application = "Other Service", log_machine_name = "APP01", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-7), log_application = "Other Service", log_machine_name = "APP01", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-7), log_application = "Application web", log_level = "WARN", log_call_site = "Unit test", aspnet_sessionid = "UnitTEST1234567890" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-8), log_application = "Application service", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-9), log_application = "Application web", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "UnitTEST1234567890" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-10), log_application = "Application web", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "UnitTEST1234567890" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-11), log_application = "Application web", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "UnitTEST1234567890" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-12), log_application = "Application web", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "UnitTEST1234567890" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-13), log_application = "Other Service", log_machine_name = "APP01", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-14), log_application = "Other Service", log_machine_name = "APP01", log_level = "ERROR", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-15), log_application = "Other Service", log_machine_name = "APP01", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-16), log_application = "Other Service", log_machine_name = "APP01", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddSeconds(-17), log_application = "Other Service", log_machine_name = "APP01", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddHours(-1), log_application = "Application web", log_level = "WARN", log_call_site = "Unit test", aspnet_sessionid = "UnitTEST1234567890" },
                new system_logging { entered_date = DateTime.Now.AddHours(-1), log_application = "Application service", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "" },
                new system_logging { entered_date = DateTime.Now.AddHours(-1), log_application = "Application web", log_level = "DEBUG", log_call_site = "Unit test", aspnet_sessionid = "UnitTEST1234567890" },
            }.AsQueryable();

            //  Wire up the DBSet operations
            mockSet.As<IQueryable<system_logging>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<system_logging>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<system_logging>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<system_logging>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            //  Setup the database context
            mockContext.Setup(c => c.system_logging).Returns(mockSet.Object);
        }

        [TestMethod]
        public void GetLogItems_EmptyRequest_IsSuccessful()
        {
            //  Arrange
            LogFetchRequest request = new LogFetchRequest();

            LogFetchResponse results = new LogFetchResponse();
            LogDataManager manager = new LogDataManager(mockContext.Object);

            //  Act
            results = manager.GetLogItems(request);

            //  Assert
            Assert.IsNotNull(results);                      /* Result object should not be null */
            Assert.AreNotEqual(0, results.Count);      /* We should have some results */
            Assert.AreNotEqual(0, results.Data.Count); /* Serously.  We should have some results */
            Assert.AreNotEqual(0, results.TotalCount); /* No Serously.  We should have some results */
            Assert.IsFalse(results.Count < 20);             /* We should have more than 20 results */
            Assert.IsTrue(results.Data.ToList()[0].entered_date > results.Data.ToList()[19].entered_date, "Log items are not returned in descending order of entered date/time");
        }

        [TestMethod]
        public void GetLogItems_FilteredByApplicationName_IsSuccessful()
        {
            //  Arrange
            LogFetchRequest request = new LogFetchRequest()
            {
                ApplicationName = "Application web"
            };

            LogFetchResponse results = new LogFetchResponse();
            LogDataManager manager = new LogDataManager(mockContext.Object);

            //  Act
            results = manager.GetLogItems(request);

            //  Assert
            Assert.IsNotNull(results);                      /* Result object should not be null */
            Assert.AreNotEqual(0, results.Count);      /* We should have some results */
            Assert.AreNotEqual(0, results.Data.Count); /* Serously.  We should have some results */
            Assert.AreNotEqual(0, results.TotalCount); /* No Serously.  We should have some results */

            //  All of the items should have the selected application name
            foreach(var item in results.Data)
            {
                Assert.AreEqual(request.ApplicationName, item.log_application);
            }
        }

        [TestMethod]
        public void GetLogItems_FilteredByDate_IsSuccessful()
        {
            //  Arrange
            LogFetchRequest request = new LogFetchRequest()
            {
                StartDate = DateTime.Now.AddDays(-2),
                PageSize = 500
            };

            LogFetchResponse results = new LogFetchResponse();
            LogDataManager manager = new LogDataManager(mockContext.Object);

            //  Act
            results = manager.GetLogItems(request);

            //  Assert
            Assert.IsNotNull(results);                      /* Result object should not be null */
            Assert.AreNotEqual(0, results.Count);      /* We should have some results */
            Assert.AreNotEqual(0, results.Data.Count); /* Serously.  We should have some results */
            Assert.AreNotEqual(0, results.TotalCount); /* No Serously.  We should have some results */

            //  None of the items should be earlier than the start date
            foreach(var item in results.Data)
            {
                Assert.IsTrue(item.entered_date > request.StartDate);
            }
        }

        [TestMethod]
        public void GetLogItems_FilteredByMachineName_IsSuccessful()
        {
            //  Arrange
            LogFetchRequest request = new LogFetchRequest()
            {
                MachineName = "APP01"
            };

            LogFetchResponse results = new LogFetchResponse();
            LogDataManager manager = new LogDataManager(mockContext.Object);

            //  Act
            results = manager.GetLogItems(request);

            //  Assert
            Assert.IsNotNull(results);                      /* Result object should not be null */
            Assert.AreNotEqual(0, results.Count);      /* We should have some results */
            Assert.AreNotEqual(0, results.Data.Count); /* Serously.  We should have some results */
            Assert.AreNotEqual(0, results.TotalCount); /* No Serously.  We should have some results */

            //  All of the items should have the selected machine name
            foreach(var item in results.Data)
            {
                Assert.AreEqual(request.MachineName, item.log_machine_name);
            }
        }

        [TestMethod]
        public void GetLogItems_WithPageAndSize_IsSuccessful()
        {
            //  Arrange
            LogFetchRequest request = new LogFetchRequest()
            {
                PageSize = 5,
                Page = 3
            };

            LogFetchResponse results = new LogFetchResponse();
            LogDataManager manager = new LogDataManager(mockContext.Object);

            //  Act
            results = manager.GetLogItems(request);

            //  Assert
            Assert.IsNotNull(results);                      /* Result object should not be null */
            Assert.AreNotEqual(0, results.Count);      /* We should have some results */
            Assert.AreNotEqual(0, results.Data.Count); /* Serously.  We should have some results */
            Assert.AreNotEqual(0, results.TotalCount); /* No Serously.  We should have some results */
            Assert.AreEqual<int>(request.PageSize, results.Count);
            Assert.AreEqual<int>(request.PageSize, results.Data.Count);
        }

        [TestMethod]
        public void GetLogItems_WithPaging_IsSuccessful()
        {
            //  Arrange
            int pageSize = 1000000;
            int resultSetSize = 0;

            LogFetchRequest initialRequest = new LogFetchRequest()
            {
                PageSize = pageSize
            };

            LogFetchResponse initialResults = new LogFetchResponse();
            LogDataManager manager = new LogDataManager(mockContext.Object);

            //  Act
            initialResults = manager.GetLogItems(initialRequest);

            //  Assert
            Assert.IsNotNull(initialResults);
            Assert.AreNotEqual(0, initialResults.Count);

            //  Make sure that paging through the results yields the same
            //  number of results as making one big request:
            LogFetchRequest pagingRequest = new LogFetchRequest()
            {
                PageSize = 3
            };

            for(int i = 0; ; i++)
            {
                pagingRequest.Page = i;
                var results = manager.GetLogItems(pagingRequest);
                resultSetSize = resultSetSize + results.Count;

                if(results.Count == 0)
                    break;
            }

            Assert.AreEqual<int>(initialResults.Count, resultSetSize);
        }

        [TestMethod]
        public void GetAllApplications_IsSuccessful()
        {
            //  Arrange
            LogDataManager manager = new LogDataManager(mockContext.Object);
            int expectedNumberOfApplications = 3;

            //  Act
            List<string> results = manager.GetAllApplications();

            //  Assert
            Assert.IsNotNull(results);
            Assert.AreEqual(expectedNumberOfApplications, results.Count());
        }

        [TestMethod]
        public void GetApplicationLogCounts_IsSuccessful()
        {
            //  Arrange
            LogDataManager manager = new LogDataManager(mockContext.Object);
            int expectedNumberOfApplications = 3;

            //  Act
            List<LogCountByApplicationResponse> results = manager.GetApplicationLogCounts();

            //  Assert
            Assert.IsNotNull(results);
            Assert.AreEqual(expectedNumberOfApplications, results.Count());
            Assert.AreEqual(0, results[0].DebugCount);
        }

        [TestMethod]
        public void GetHourlyLogCounts_IsSuccessful()
        {
            //  Arrange
            LogDataManager manager = new LogDataManager(mockContext.Object);
            int expectedNumberOfHours = 2;

            //  Act
            List<LogCountByHourResponse> results = manager.GetHourlyLogCounts();

            /* Counts should look like this:

            Previous hour
                Trace: 0
                Debug: 2
                Warn: 1
                Error: 0
                Fatal: 0
                
            Current hour
                Trace: 0
                Debug: 16 
                Warn: 1
                Error: 2
                Fatal: 0

             */

            //  Assert
            Assert.IsNotNull(results);
            Assert.AreEqual(expectedNumberOfHours, results.Count());    //  Should have grouped appropriately
            Assert.AreEqual(2, results[0].DebugCount);                  //  Previous hour debug count
            Assert.AreEqual(16, results[1].DebugCount);                 //  Current hour debug count
        }



    }
}
