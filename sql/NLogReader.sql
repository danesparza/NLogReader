SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[system_logging](
	[system_logging_guid] [uniqueidentifier] ROWGUIDCOL  NOT NULL CONSTRAINT [DF_system_logging_system_logging_guid]  DEFAULT (newid()),
	[entered_date] [datetime] NULL CONSTRAINT [DF_system_logging_entered_date]  DEFAULT (getdate()),
	[log_application] [nvarchar](200) NULL,
	[log_date] [nvarchar](100) NULL,
	[log_level] [nvarchar](100) NULL,
	[log_logger] [nvarchar](max) NULL,
	[log_message] [nvarchar](max) NULL,
	[log_machine_name] [nvarchar](max) NULL,
	[log_user_name] [nvarchar](max) NULL,
	[log_call_site] [nvarchar](max) NULL,
	[log_thread] [nvarchar](100) NULL,
	[log_exception] [nvarchar](max) NULL,
	[log_stacktrace] [nvarchar](max) NULL,
	[aspnet_sessionid] [nvarchar](100) NULL,
 CONSTRAINT [PK_system_logging] PRIMARY KEY CLUSTERED 
(
	[system_logging_guid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
