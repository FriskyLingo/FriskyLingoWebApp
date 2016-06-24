Imports System.Web.Services
Imports System.Web.Script.Services
Imports Microsoft.VisualBasic.CompilerServices

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
<ScriptService()> _
<WebService(Namespace:="http://www.friskylingo.com/")> _
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<DesignerGenerated()> _
Public Class ws_Data
    Inherits WebService

#Region "Quarters"
    <WebMethod(enableSession:=True)> _
    Public Function Login(userId As String, password As String) As String
        Dim returnData As String = "fail"

        Try
            Using db As New QuartersContext()
                Dim userExists As Boolean = db.Users.Any(Function(u) u.userId = userId AndAlso u.password = password)

                If userExists Then
                    returnData = "success"
                End If
            End Using
        Catch ex As Exception
            Throw New Exception("FUNCTION[" + (New StackFrame()).GetMethod.Name + "] ERROR[" + ex.Message + "] STACKTRACE[" + ex.StackTrace() + "]", ex)
        End Try

        Return returnData
    End Function

    <WebMethod(enableSession:=True)> _
    Public Function GetQuarterTypes() As List(Of sec_Select_lu_QuarterType_Result)
        Dim returnData As New List(Of sec_Select_lu_QuarterType_Result)

        Try
            Using db As New QuartersContext()
                Dim quarterTypeRows As List(Of sec_Select_lu_QuarterType_Result) = db.sec_Select_lu_QuarterType(Nothing).ToList()

                returnData = quarterTypeRows

                'Loop through each NotificationPreference to update
                For Each qtRow As sec_Select_lu_QuarterType_Result In quarterTypeRows
                    Debug.WriteLine(qtRow.imageFileName)
                Next
            End Using
        Catch ex As Exception
            Throw New Exception("FUNCTION[" + (New StackFrame()).GetMethod.Name + "] ERROR[" + ex.Message + "] STACKTRACE[" + ex.StackTrace() + "]", ex)
        End Try

        Return returnData
    End Function

    <WebMethod(enableSession:=True)> _
    Public Function GetQuarters() As List(Of sec_Select_vw_Quarters_Result)
        Dim returnData As New List(Of sec_Select_vw_Quarters_Result)

        Try
            Using db As New QuartersContext()
                Dim quartersViewRows As List(Of sec_Select_vw_Quarters_Result) = db.sec_Select_vw_Quarters().ToList()

                returnData = quartersViewRows

                'Loop through each NotificationPreference to update
                For Each qvRow As sec_Select_vw_Quarters_Result In quartersViewRows
                    Debug.WriteLine(qvRow.Location_Name)
                Next
            End Using
        Catch ex As Exception
            Throw New Exception("FUNCTION[" + (New StackFrame()).GetMethod.Name + "] ERROR[" + ex.Message + "] STACKTRACE[" + ex.StackTrace() + "]", ex)
        End Try

        Return returnData
    End Function

    <WebMethod(enableSession:=True)> _
    Public Function UpdateQuarterStatus(quarterId As Integer, mint As String, value As Byte) As String
        Dim returnData As String = String.Empty

        Try
            Using db As New QuartersContext
                db.sec_Update_QuarterStatus(quarterId, IIf(mint = "P", value, Nothing), IIf(mint = "D", value, Nothing), Date.Now())
                db.SaveChanges()

                returnData = "DONE"
            End Using
        Catch ex As Exception
            Throw New Exception("FUNCTION[" + (New StackFrame()).GetMethod.Name + "] ERROR[" + ex.Message + "] STACKTRACE[" + ex.StackTrace() + "]", ex)
        End Try

        Return returnData
    End Function
#End Region
End Class