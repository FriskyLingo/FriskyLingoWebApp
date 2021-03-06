﻿'------------------------------------------------------------------------------
' <auto-generated>
'     This code was generated from a template.
'
'     Manual changes to this file may cause unexpected behavior in your application.
'     Manual changes to this file will be overwritten if the code is regenerated.
' </auto-generated>
'------------------------------------------------------------------------------

Imports System
Imports System.Data.Entity
Imports System.Data.Entity.Infrastructure
Imports System.Data.Entity.Core.Objects
Imports System.Linq

Partial Public Class QuartersContext
    Inherits DbContext

    Public Sub New()
        MyBase.New("name=QuartersContext")
    End Sub

    Protected Overrides Sub OnModelCreating(modelBuilder As DbModelBuilder)
        Throw New UnintentionalCodeFirstException()
    End Sub

    Public Overridable Property Locations() As DbSet(Of Location)
    Public Overridable Property lu_LocationType() As DbSet(Of lu_LocationType)
    Public Overridable Property NationalSites() As DbSet(Of NationalSite)
    Public Overridable Property QuarterStatuses() As DbSet(Of QuarterStatus)
    Public Overridable Property lu_QuarterType() As DbSet(Of lu_QuarterType)
    Public Overridable Property Users() As DbSet(Of User)
    Public Overridable Property Quarters() As DbSet(Of Quarter)
    Public Overridable Property vw_Quarters() As DbSet(Of vw_Quarters)

    Public Overridable Function sec_Delete_Location(id As Nullable(Of Integer)) As Integer
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction("sec_Delete_Location", idParameter)
    End Function

    Public Overridable Function sec_Delete_lu_LocationType(id As Nullable(Of Integer)) As Integer
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction("sec_Delete_lu_LocationType", idParameter)
    End Function

    Public Overridable Function sec_Delete_lu_QuarterType(id As Nullable(Of Integer)) As Integer
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction("sec_Delete_lu_QuarterType", idParameter)
    End Function

    Public Overridable Function sec_Delete_NationalSite(id As Nullable(Of Integer)) As Integer
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction("sec_Delete_NationalSite", idParameter)
    End Function

    Public Overridable Function sec_Delete_Quarter(id As Nullable(Of Integer)) As Integer
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction("sec_Delete_Quarter", idParameter)
    End Function

    Public Overridable Function sec_Delete_QuarterStatus(id As Nullable(Of Integer)) As Integer
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction("sec_Delete_QuarterStatus", idParameter)
    End Function

    Public Overridable Function sec_Insert_Location(locationTypeId As Nullable(Of Integer), code As String, name As String, officialDate As Nullable(Of Date), lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Insert_Location_Result)
        Dim locationTypeIdParameter As ObjectParameter = If(locationTypeId.HasValue, New ObjectParameter("locationTypeId", locationTypeId), New ObjectParameter("locationTypeId", GetType(Integer)))

        Dim codeParameter As ObjectParameter = If(code IsNot Nothing, New ObjectParameter("code", code), New ObjectParameter("code", GetType(String)))

        Dim nameParameter As ObjectParameter = If(name IsNot Nothing, New ObjectParameter("name", name), New ObjectParameter("name", GetType(String)))

        Dim officialDateParameter As ObjectParameter = If(officialDate.HasValue, New ObjectParameter("officialDate", officialDate), New ObjectParameter("officialDate", GetType(Date)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Insert_Location_Result)("sec_Insert_Location", locationTypeIdParameter, codeParameter, nameParameter, officialDateParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Insert_lu_LocationType(shortDescription As String, longDescription As String, lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Insert_lu_LocationType_Result)
        Dim shortDescriptionParameter As ObjectParameter = If(shortDescription IsNot Nothing, New ObjectParameter("shortDescription", shortDescription), New ObjectParameter("shortDescription", GetType(String)))

        Dim longDescriptionParameter As ObjectParameter = If(longDescription IsNot Nothing, New ObjectParameter("longDescription", longDescription), New ObjectParameter("longDescription", GetType(String)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Insert_lu_LocationType_Result)("sec_Insert_lu_LocationType", shortDescriptionParameter, longDescriptionParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Insert_lu_QuarterType(code As String, shortDescription As String, longDescription As String, imageFileName As String, lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Insert_lu_QuarterType_Result)
        Dim codeParameter As ObjectParameter = If(code IsNot Nothing, New ObjectParameter("code", code), New ObjectParameter("code", GetType(String)))

        Dim shortDescriptionParameter As ObjectParameter = If(shortDescription IsNot Nothing, New ObjectParameter("shortDescription", shortDescription), New ObjectParameter("shortDescription", GetType(String)))

        Dim longDescriptionParameter As ObjectParameter = If(longDescription IsNot Nothing, New ObjectParameter("longDescription", longDescription), New ObjectParameter("longDescription", GetType(String)))

        Dim imageFileNameParameter As ObjectParameter = If(imageFileName IsNot Nothing, New ObjectParameter("imageFileName", imageFileName), New ObjectParameter("imageFileName", GetType(String)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Insert_lu_QuarterType_Result)("sec_Insert_lu_QuarterType", codeParameter, shortDescriptionParameter, longDescriptionParameter, imageFileNameParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Insert_NationalSite(locationId As Nullable(Of Integer), containingLocationId As Nullable(Of Integer), lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Insert_NationalSite_Result)
        Dim locationIdParameter As ObjectParameter = If(locationId.HasValue, New ObjectParameter("locationId", locationId), New ObjectParameter("locationId", GetType(Integer)))

        Dim containingLocationIdParameter As ObjectParameter = If(containingLocationId.HasValue, New ObjectParameter("containingLocationId", containingLocationId), New ObjectParameter("containingLocationId", GetType(Integer)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Insert_NationalSite_Result)("sec_Insert_NationalSite", locationIdParameter, containingLocationIdParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Insert_Quarter(quarterTypeId As Nullable(Of Integer), locationId As Nullable(Of Integer), releaseDate As Nullable(Of Date), releaseOrder As Nullable(Of Integer), mintagePhiladelphia As Nullable(Of Integer), mintageDenver As Nullable(Of Integer), mintageTotal As Nullable(Of Integer), elementsDepicted As String, bannerText As String, caption1Text As String, caption2Text As String, engraver As String, notes As String, imageFileName As String, lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Insert_Quarter_Result)
        Dim quarterTypeIdParameter As ObjectParameter = If(quarterTypeId.HasValue, New ObjectParameter("quarterTypeId", quarterTypeId), New ObjectParameter("quarterTypeId", GetType(Integer)))

        Dim locationIdParameter As ObjectParameter = If(locationId.HasValue, New ObjectParameter("locationId", locationId), New ObjectParameter("locationId", GetType(Integer)))

        Dim releaseDateParameter As ObjectParameter = If(releaseDate.HasValue, New ObjectParameter("releaseDate", releaseDate), New ObjectParameter("releaseDate", GetType(Date)))

        Dim releaseOrderParameter As ObjectParameter = If(releaseOrder.HasValue, New ObjectParameter("releaseOrder", releaseOrder), New ObjectParameter("releaseOrder", GetType(Integer)))

        Dim mintagePhiladelphiaParameter As ObjectParameter = If(mintagePhiladelphia.HasValue, New ObjectParameter("mintagePhiladelphia", mintagePhiladelphia), New ObjectParameter("mintagePhiladelphia", GetType(Integer)))

        Dim mintageDenverParameter As ObjectParameter = If(mintageDenver.HasValue, New ObjectParameter("mintageDenver", mintageDenver), New ObjectParameter("mintageDenver", GetType(Integer)))

        Dim mintageTotalParameter As ObjectParameter = If(mintageTotal.HasValue, New ObjectParameter("mintageTotal", mintageTotal), New ObjectParameter("mintageTotal", GetType(Integer)))

        Dim elementsDepictedParameter As ObjectParameter = If(elementsDepicted IsNot Nothing, New ObjectParameter("elementsDepicted", elementsDepicted), New ObjectParameter("elementsDepicted", GetType(String)))

        Dim bannerTextParameter As ObjectParameter = If(bannerText IsNot Nothing, New ObjectParameter("bannerText", bannerText), New ObjectParameter("bannerText", GetType(String)))

        Dim caption1TextParameter As ObjectParameter = If(caption1Text IsNot Nothing, New ObjectParameter("caption1Text", caption1Text), New ObjectParameter("caption1Text", GetType(String)))

        Dim caption2TextParameter As ObjectParameter = If(caption2Text IsNot Nothing, New ObjectParameter("caption2Text", caption2Text), New ObjectParameter("caption2Text", GetType(String)))

        Dim engraverParameter As ObjectParameter = If(engraver IsNot Nothing, New ObjectParameter("engraver", engraver), New ObjectParameter("engraver", GetType(String)))

        Dim notesParameter As ObjectParameter = If(notes IsNot Nothing, New ObjectParameter("notes", notes), New ObjectParameter("notes", GetType(String)))

        Dim imageFileNameParameter As ObjectParameter = If(imageFileName IsNot Nothing, New ObjectParameter("imageFileName", imageFileName), New ObjectParameter("imageFileName", GetType(String)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Insert_Quarter_Result)("sec_Insert_Quarter", quarterTypeIdParameter, locationIdParameter, releaseDateParameter, releaseOrderParameter, mintagePhiladelphiaParameter, mintageDenverParameter, mintageTotalParameter, elementsDepictedParameter, bannerTextParameter, caption1TextParameter, caption2TextParameter, engraverParameter, notesParameter, imageFileNameParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Insert_QuarterStatus(quarterId As Nullable(Of Integer), mintPhiladelphia As Nullable(Of Byte), mintDenver As Nullable(Of Byte), lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Insert_QuarterStatus_Result)
        Dim quarterIdParameter As ObjectParameter = If(quarterId.HasValue, New ObjectParameter("quarterId", quarterId), New ObjectParameter("quarterId", GetType(Integer)))

        Dim mintPhiladelphiaParameter As ObjectParameter = If(mintPhiladelphia.HasValue, New ObjectParameter("mintPhiladelphia", mintPhiladelphia), New ObjectParameter("mintPhiladelphia", GetType(Byte)))

        Dim mintDenverParameter As ObjectParameter = If(mintDenver.HasValue, New ObjectParameter("mintDenver", mintDenver), New ObjectParameter("mintDenver", GetType(Byte)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Insert_QuarterStatus_Result)("sec_Insert_QuarterStatus", quarterIdParameter, mintPhiladelphiaParameter, mintDenverParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Select_Location(id As Nullable(Of Integer)) As ObjectResult(Of sec_Select_Location_Result)
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Select_Location_Result)("sec_Select_Location", idParameter)
    End Function

    Public Overridable Function sec_Select_lu_LocationType(id As Nullable(Of Integer)) As ObjectResult(Of sec_Select_lu_LocationType_Result)
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Select_lu_LocationType_Result)("sec_Select_lu_LocationType", idParameter)
    End Function

    Public Overridable Function sec_Select_lu_QuarterType(id As Nullable(Of Integer)) As ObjectResult(Of sec_Select_lu_QuarterType_Result)
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Select_lu_QuarterType_Result)("sec_Select_lu_QuarterType", idParameter)
    End Function

    Public Overridable Function sec_Select_NationalSite(id As Nullable(Of Integer)) As ObjectResult(Of sec_Select_NationalSite_Result)
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Select_NationalSite_Result)("sec_Select_NationalSite", idParameter)
    End Function

    Public Overridable Function sec_Select_Quarter(id As Nullable(Of Integer)) As ObjectResult(Of sec_Select_Quarter_Result)
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Select_Quarter_Result)("sec_Select_Quarter", idParameter)
    End Function

    Public Overridable Function sec_Select_QuarterStatus(id As Nullable(Of Integer)) As ObjectResult(Of sec_Select_QuarterStatus_Result)
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Select_QuarterStatus_Result)("sec_Select_QuarterStatus", idParameter)
    End Function

    Public Overridable Function sec_Update_Location(id As Nullable(Of Integer), locationTypeId As Nullable(Of Integer), code As String, name As String, officialDate As Nullable(Of Date), lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Update_Location_Result)
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Dim locationTypeIdParameter As ObjectParameter = If(locationTypeId.HasValue, New ObjectParameter("locationTypeId", locationTypeId), New ObjectParameter("locationTypeId", GetType(Integer)))

        Dim codeParameter As ObjectParameter = If(code IsNot Nothing, New ObjectParameter("code", code), New ObjectParameter("code", GetType(String)))

        Dim nameParameter As ObjectParameter = If(name IsNot Nothing, New ObjectParameter("name", name), New ObjectParameter("name", GetType(String)))

        Dim officialDateParameter As ObjectParameter = If(officialDate.HasValue, New ObjectParameter("officialDate", officialDate), New ObjectParameter("officialDate", GetType(Date)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Update_Location_Result)("sec_Update_Location", idParameter, locationTypeIdParameter, codeParameter, nameParameter, officialDateParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Update_lu_LocationType(id As Nullable(Of Integer), shortDescription As String, longDescription As String, lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Update_lu_LocationType_Result)
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Dim shortDescriptionParameter As ObjectParameter = If(shortDescription IsNot Nothing, New ObjectParameter("shortDescription", shortDescription), New ObjectParameter("shortDescription", GetType(String)))

        Dim longDescriptionParameter As ObjectParameter = If(longDescription IsNot Nothing, New ObjectParameter("longDescription", longDescription), New ObjectParameter("longDescription", GetType(String)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Update_lu_LocationType_Result)("sec_Update_lu_LocationType", idParameter, shortDescriptionParameter, longDescriptionParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Update_lu_QuarterType(id As Nullable(Of Integer), code As String, shortDescription As String, longDescription As String, imageFileName As String, lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Update_lu_QuarterType_Result)
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Dim codeParameter As ObjectParameter = If(code IsNot Nothing, New ObjectParameter("code", code), New ObjectParameter("code", GetType(String)))

        Dim shortDescriptionParameter As ObjectParameter = If(shortDescription IsNot Nothing, New ObjectParameter("shortDescription", shortDescription), New ObjectParameter("shortDescription", GetType(String)))

        Dim longDescriptionParameter As ObjectParameter = If(longDescription IsNot Nothing, New ObjectParameter("longDescription", longDescription), New ObjectParameter("longDescription", GetType(String)))

        Dim imageFileNameParameter As ObjectParameter = If(imageFileName IsNot Nothing, New ObjectParameter("imageFileName", imageFileName), New ObjectParameter("imageFileName", GetType(String)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Update_lu_QuarterType_Result)("sec_Update_lu_QuarterType", idParameter, codeParameter, shortDescriptionParameter, longDescriptionParameter, imageFileNameParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Update_NationalSite(id As Nullable(Of Integer), locationId As Nullable(Of Integer), containingLocationId As Nullable(Of Integer), lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Update_NationalSite_Result)
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Dim locationIdParameter As ObjectParameter = If(locationId.HasValue, New ObjectParameter("locationId", locationId), New ObjectParameter("locationId", GetType(Integer)))

        Dim containingLocationIdParameter As ObjectParameter = If(containingLocationId.HasValue, New ObjectParameter("containingLocationId", containingLocationId), New ObjectParameter("containingLocationId", GetType(Integer)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Update_NationalSite_Result)("sec_Update_NationalSite", idParameter, locationIdParameter, containingLocationIdParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Update_Quarter(id As Nullable(Of Integer), quarterTypeId As Nullable(Of Integer), locationId As Nullable(Of Integer), releaseDate As Nullable(Of Date), releaseOrder As Nullable(Of Integer), mintagePhiladelphia As Nullable(Of Integer), mintageDenver As Nullable(Of Integer), mintageTotal As Nullable(Of Integer), elementsDepicted As String, bannerText As String, caption1Text As String, caption2Text As String, engraver As String, notes As String, imageFileName As String, lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Update_Quarter_Result)
        Dim idParameter As ObjectParameter = If(id.HasValue, New ObjectParameter("id", id), New ObjectParameter("id", GetType(Integer)))

        Dim quarterTypeIdParameter As ObjectParameter = If(quarterTypeId.HasValue, New ObjectParameter("quarterTypeId", quarterTypeId), New ObjectParameter("quarterTypeId", GetType(Integer)))

        Dim locationIdParameter As ObjectParameter = If(locationId.HasValue, New ObjectParameter("locationId", locationId), New ObjectParameter("locationId", GetType(Integer)))

        Dim releaseDateParameter As ObjectParameter = If(releaseDate.HasValue, New ObjectParameter("releaseDate", releaseDate), New ObjectParameter("releaseDate", GetType(Date)))

        Dim releaseOrderParameter As ObjectParameter = If(releaseOrder.HasValue, New ObjectParameter("releaseOrder", releaseOrder), New ObjectParameter("releaseOrder", GetType(Integer)))

        Dim mintagePhiladelphiaParameter As ObjectParameter = If(mintagePhiladelphia.HasValue, New ObjectParameter("mintagePhiladelphia", mintagePhiladelphia), New ObjectParameter("mintagePhiladelphia", GetType(Integer)))

        Dim mintageDenverParameter As ObjectParameter = If(mintageDenver.HasValue, New ObjectParameter("mintageDenver", mintageDenver), New ObjectParameter("mintageDenver", GetType(Integer)))

        Dim mintageTotalParameter As ObjectParameter = If(mintageTotal.HasValue, New ObjectParameter("mintageTotal", mintageTotal), New ObjectParameter("mintageTotal", GetType(Integer)))

        Dim elementsDepictedParameter As ObjectParameter = If(elementsDepicted IsNot Nothing, New ObjectParameter("elementsDepicted", elementsDepicted), New ObjectParameter("elementsDepicted", GetType(String)))

        Dim bannerTextParameter As ObjectParameter = If(bannerText IsNot Nothing, New ObjectParameter("bannerText", bannerText), New ObjectParameter("bannerText", GetType(String)))

        Dim caption1TextParameter As ObjectParameter = If(caption1Text IsNot Nothing, New ObjectParameter("caption1Text", caption1Text), New ObjectParameter("caption1Text", GetType(String)))

        Dim caption2TextParameter As ObjectParameter = If(caption2Text IsNot Nothing, New ObjectParameter("caption2Text", caption2Text), New ObjectParameter("caption2Text", GetType(String)))

        Dim engraverParameter As ObjectParameter = If(engraver IsNot Nothing, New ObjectParameter("engraver", engraver), New ObjectParameter("engraver", GetType(String)))

        Dim notesParameter As ObjectParameter = If(notes IsNot Nothing, New ObjectParameter("notes", notes), New ObjectParameter("notes", GetType(String)))

        Dim imageFileNameParameter As ObjectParameter = If(imageFileName IsNot Nothing, New ObjectParameter("imageFileName", imageFileName), New ObjectParameter("imageFileName", GetType(String)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Update_Quarter_Result)("sec_Update_Quarter", idParameter, quarterTypeIdParameter, locationIdParameter, releaseDateParameter, releaseOrderParameter, mintagePhiladelphiaParameter, mintageDenverParameter, mintageTotalParameter, elementsDepictedParameter, bannerTextParameter, caption1TextParameter, caption2TextParameter, engraverParameter, notesParameter, imageFileNameParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Update_QuarterStatus(quarterId As Nullable(Of Integer), mintPhiladelphia As Nullable(Of Byte), mintDenver As Nullable(Of Byte), lastUpdate As Nullable(Of Date)) As ObjectResult(Of sec_Update_QuarterStatus_Result)
        Dim quarterIdParameter As ObjectParameter = If(quarterId.HasValue, New ObjectParameter("quarterId", quarterId), New ObjectParameter("quarterId", GetType(Integer)))

        Dim mintPhiladelphiaParameter As ObjectParameter = If(mintPhiladelphia.HasValue, New ObjectParameter("mintPhiladelphia", mintPhiladelphia), New ObjectParameter("mintPhiladelphia", GetType(Byte)))

        Dim mintDenverParameter As ObjectParameter = If(mintDenver.HasValue, New ObjectParameter("mintDenver", mintDenver), New ObjectParameter("mintDenver", GetType(Byte)))

        Dim lastUpdateParameter As ObjectParameter = If(lastUpdate.HasValue, New ObjectParameter("lastUpdate", lastUpdate), New ObjectParameter("lastUpdate", GetType(Date)))

        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Update_QuarterStatus_Result)("sec_Update_QuarterStatus", quarterIdParameter, mintPhiladelphiaParameter, mintDenverParameter, lastUpdateParameter)
    End Function

    Public Overridable Function sec_Select_vw_Quarters() As ObjectResult(Of sec_Select_vw_Quarters_Result)
        Return DirectCast(Me, IObjectContextAdapter).ObjectContext.ExecuteFunction(Of sec_Select_vw_Quarters_Result)("sec_Select_vw_Quarters")
    End Function

End Class
