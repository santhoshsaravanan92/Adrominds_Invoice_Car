USE [d1.api]
GO
/****** Object:  Table [test].[AssistantInformation]    Script Date: 18-05-2020 23:54:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [test].[AssistantInformation](
	[ID] [int] AUTO_iNCREMENT NOT NULL,
	[MasterEmail] [varchar](50) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[IsDashboard] [bit] NULL,
	[IsQuotation] [bit] NULL,
	[IsSales] [bit] NULL,
	[IsReminder] [bit] NULL,
	[IsReports] [bit] NULL,
	[IsSettings] [bit] NULL,
	[IsInvoice] [bit] NULL,
 CONSTRAINT [PK_AssistantInformation] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [test].[Login]    Script Date: 18-05-2020 23:54:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [test].[Login](
	[ID] [int] AUTO_INCREMENT NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](15) NOT NULL,
	[Temp] [nvarchar](15) NULL,
 CONSTRAINT [PK_Login] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_Login] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [test].[PersonalInformation]    Script Date: 18-05-2020 23:54:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [test].[PersonalInformation](
	[ID] [int] AUTO_INCREMENT NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Company] [nvarchar](500) NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Mobile] [varchar](50) NULL,
	[Address] [nvarchar](max) NULL,
	[GST] [nvarchar](50) NULL,
	[Logo] [binary](5000) NULL,
	[LogoName] [nvarchar](50) NULL,
 CONSTRAINT [PK_PersonalInformation] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [test].[AssistantInformation] ADD  CONSTRAINT [DF_AssistantInformation_IsDashboard]  DEFAULT ((0)) FOR [IsDashboard]
GO
ALTER TABLE [test].[AssistantInformation] ADD  CONSTRAINT [DF_AssistantInformation_IsQuotation]  DEFAULT ((0)) FOR [IsQuotation]
GO
ALTER TABLE [test].[AssistantInformation] ADD  CONSTRAINT [DF_AssistantInformation_IsSales]  DEFAULT ((0)) FOR [IsSales]
GO
ALTER TABLE [test].[AssistantInformation] ADD  CONSTRAINT [DF_AssistantInformation_IsReminder]  DEFAULT ((0)) FOR [IsReminder]
GO
ALTER TABLE [test].[AssistantInformation] ADD  CONSTRAINT [DF_AssistantInformation_IsReports]  DEFAULT ((0)) FOR [IsReports]
GO
ALTER TABLE [test].[AssistantInformation] ADD  CONSTRAINT [DF_AssistantInformation_IsSettings]  DEFAULT ((0)) FOR [IsSettings]
GO
ALTER TABLE [test].[AssistantInformation] ADD  CONSTRAINT [DF_AssistantInformation_IsInvoice]  DEFAULT ((0)) FOR [IsInvoice]
GO
