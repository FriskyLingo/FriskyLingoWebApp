Imports System.Web.Services
Imports System.Data.SqlClient

Public Class Test
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            'Debug.WriteLine(TestWebMethod("sidjfslidfjsdifj"))
        Catch ex As Exception

        End Try
    End Sub

    <WebMethod(enableSession:=True)> _
    Public Shared Function TestWebMethod(ByVal data As String) As String
        Dim returnData As String = String.Empty

        Try
            returnData = data
        Catch ex As Exception
            Throw New Exception("METHOD[" + (New System.Diagnostics.StackFrame()).GetMethod.Name + "] ERROR[" + ex.Message + "] STACKTRACE[" + ex.StackTrace() + "]", ex)
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
End Class