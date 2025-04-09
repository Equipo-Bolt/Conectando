BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Objectives] (
    [id] INT NOT NULL IDENTITY(1,1),
    [grade] INT NOT NULL,
    [weight] INT NOT NULL,
    [title] VARCHAR(500) NOT NULL,
    [goal] VARCHAR(1000) NOT NULL,
    [result] VARCHAR(1000) NOT NULL,
    [objectiveClasificationID] INT NOT NULL,
    [formID] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Objectives_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deactived] BIT NOT NULL CONSTRAINT [Objectives_deactived_df] DEFAULT 0,
    CONSTRAINT [Objectives_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ObjectiveClasifications] (
    [id] INT NOT NULL IDENTITY(1,1),
    [weight] INT NOT NULL,
    [clasificationID] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ObjectiveClasifications_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deactived] BIT NOT NULL CONSTRAINT [ObjectiveClasifications_deactived_df] DEFAULT 0,
    CONSTRAINT [ObjectiveClasifications_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Clasifications] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] VARCHAR(255) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Clasifications_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deactived] BIT NOT NULL CONSTRAINT [Clasifications_deactived_df] DEFAULT 0,
    CONSTRAINT [Clasifications_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Comments] (
    [id] INT NOT NULL IDENTITY(1,1),
    [description] VARCHAR(500) NOT NULL,
    [commentedAt] DATETIME2 NOT NULL,
    [objectiveID] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Comments_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deactived] BIT NOT NULL CONSTRAINT [Comments_deactived_df] DEFAULT 0,
    CONSTRAINT [Comments_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Forms] (
    [id] INT NOT NULL IDENTITY(1,1),
    [aprovedAt] DATETIME2 NOT NULL,
    [gradedAt] DATETIME2 NOT NULL,
    [collaboratorID] INT NOT NULL,
    [evaluatorID] INT NOT NULL,
    [progressID] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Forms_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deactived] BIT NOT NULL CONSTRAINT [Forms_deactived_df] DEFAULT 0,
    CONSTRAINT [Forms_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Progresses] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] VARCHAR(255) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Progresses_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deactived] BIT NOT NULL CONSTRAINT [Progresses_deactived_df] DEFAULT 0,
    CONSTRAINT [Progresses_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [employeeNumber] INT NOT NULL,
    [fullName] VARCHAR(255) NOT NULL,
    [email] VARCHAR(255) NOT NULL,
    [jobPosition] VARCHAR(255) NOT NULL,
    [positionSeniority] INT NOT NULL,
    [companySeniority] INT NOT NULL,
    [companyContribution] VARCHAR(1000) NOT NULL,
    [bossID] INT NOT NULL,
    [roleID] INT NOT NULL,
    [businessUnitID] INT NOT NULL,
    [areaID] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deactived] BIT NOT NULL CONSTRAINT [Users_deactived_df] DEFAULT 0,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Users_employeeNumber_key] UNIQUE NONCLUSTERED ([employeeNumber]),
    CONSTRAINT [Users_bossID_key] UNIQUE NONCLUSTERED ([bossID])
);

-- CreateTable
CREATE TABLE [dbo].[Roles] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] VARCHAR(255) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Roles_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deactived] BIT NOT NULL CONSTRAINT [Roles_deactived_df] DEFAULT 0,
    CONSTRAINT [Roles_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Divisions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] VARCHAR(255) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Divisions_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deactived] BIT NOT NULL CONSTRAINT [Divisions_deactived_df] DEFAULT 0,
    CONSTRAINT [Divisions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BusinessUnits] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] VARCHAR(255) NOT NULL,
    [divisionID] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [BusinessUnits_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deactived] BIT NOT NULL CONSTRAINT [BusinessUnits_deactived_df] DEFAULT 0,
    CONSTRAINT [BusinessUnits_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Areas] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] VARCHAR(255) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Areas_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deactived] BIT NOT NULL CONSTRAINT [Areas_deactived_df] DEFAULT 0,
    CONSTRAINT [Areas_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Objectives] ADD CONSTRAINT [Objectives_objectiveClasificationID_fkey] FOREIGN KEY ([objectiveClasificationID]) REFERENCES [dbo].[ObjectiveClasifications]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Objectives] ADD CONSTRAINT [Objectives_formID_fkey] FOREIGN KEY ([formID]) REFERENCES [dbo].[Forms]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ObjectiveClasifications] ADD CONSTRAINT [ObjectiveClasifications_clasificationID_fkey] FOREIGN KEY ([clasificationID]) REFERENCES [dbo].[Clasifications]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comments] ADD CONSTRAINT [Comments_objectiveID_fkey] FOREIGN KEY ([objectiveID]) REFERENCES [dbo].[Objectives]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Forms] ADD CONSTRAINT [Forms_collaboratorID_fkey] FOREIGN KEY ([collaboratorID]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Forms] ADD CONSTRAINT [Forms_evaluatorID_fkey] FOREIGN KEY ([evaluatorID]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Forms] ADD CONSTRAINT [Forms_progressID_fkey] FOREIGN KEY ([progressID]) REFERENCES [dbo].[Progresses]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_bossID_fkey] FOREIGN KEY ([bossID]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_roleID_fkey] FOREIGN KEY ([roleID]) REFERENCES [dbo].[Roles]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_businessUnitID_fkey] FOREIGN KEY ([businessUnitID]) REFERENCES [dbo].[BusinessUnits]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_areaID_fkey] FOREIGN KEY ([areaID]) REFERENCES [dbo].[Areas]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BusinessUnits] ADD CONSTRAINT [BusinessUnits_divisionID_fkey] FOREIGN KEY ([divisionID]) REFERENCES [dbo].[Divisions]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
