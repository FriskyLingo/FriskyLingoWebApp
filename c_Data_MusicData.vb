Imports System.Data.SqlClient

Public Class c_Data_MusicData
    Inherits bc_Data

    ''' <summary>
    ''' Inserts an event share.
    ''' </summary>
    ''' <param name="hid"></param>
    ''' <param name="eventId"></param>
    ''' <param name="userId"></param>
    ''' <param name="lastUpdate"></param>
    ''' <param name="updator"></param>
    ''' <remarks></remarks>
    Public Sub InsertShare(ByVal theData As String, ByVal lastUpdate As DateTime, ByVal updator As String)
        Dim cmd As SqlCommand = Nothing
        Const cmdString As String = "ap_TheData_Insert"

        Try
            'Check to see if a transaction has been started on the connection.  
            If Conn.UseTrans Then
                cmd = New SqlCommand(cmdString, Conn.Connection, Conn.Trans)
            Else
                cmd = New SqlCommand(cmdString, Conn.Connection)
            End If

            'Set the type of the SQLCommand
            cmd.CommandType = CommandType.StoredProcedure

            'Add parameters to the SQLCommand
            cmd.Parameters.Add(New SqlParameter("data", theData))
            cmd.Parameters.Add(New SqlParameter("updator", updator))
            cmd.Parameters.Add(New SqlParameter("lastUpdate", lastUpdate))

            cmd.ExecuteNonQuery()
        Catch ex As Exception
            Throw New Exception("METHOD[" + (New System.Diagnostics.StackFrame()).GetMethod.Name + "] ERROR[" + ex.Message + "] STACKTRACE[" + ex.StackTrace() + "]", ex)
        Finally
            cmd.Dispose()
        End Try
    End Sub
End Class
