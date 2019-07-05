Imports System.Web.Services
Imports System.Web.Script.Services
Imports Microsoft.VisualBasic.CompilerServices
Imports Google.Apis.Auth.OAuth2
Imports Google.Apis.Sheets.v4
Imports Google.Apis.Sheets.v4.Data
Imports Google.Apis.Services
Imports Google.Apis.Util.Store
Imports System
Imports System.Collections.Generic
Imports System.IO
Imports System.Linq
Imports System.Text
Imports System.Threading
Imports System.Threading.Tasks

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
    Public Function GetSongs() As List(Of sec_Select_PlaylistMusic_Result)
        Dim returnData As New List(Of sec_Select_PlaylistMusic_Result)

        Try
            Using db As New MediaContext()
                Dim playlistMusicRows As List(Of sec_Select_PlaylistMusic_Result) = db.sec_Select_PlaylistMusic().ToList()

                returnData = playlistMusicRows
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

#Region "Google Sheets"
    ' If modifying these _scopes, delete your previously saved credentials
	' at ~/.credentials/sheets.googleapis.com-dotnet-quickstart.json
	Shared _scopes As String() = {SheetsService.Scope.SpreadsheetsReadonly}
	Shared _applicationName As String = "Google Sheets API"

    <WebMethod(enableSession:=True)> _
	Public Function GoogleSheetTest() As String
        Dim returnData As String = String.Empty

        Try
            Dim credential As UserCredential

            Debug.WriteLine(Server.MapPath("/client_secret.json"))

		    Using stream = New FileStream(Server.MapPath("/client_secret.json"), FileMode.Open, FileAccess.Read)
			    Dim credPath As String = Environment.GetFolderPath(System.Environment.SpecialFolder.Personal)
			    credPath = Path.Combine(credPath, ".credentials/sheets.googleapis.com-dotnet-quickstart.json")

			    credential = GoogleWebAuthorizationBroker.AuthorizeAsync(GoogleClientSecrets.Load(stream).Secrets, _scopes, "user", CancellationToken.None, New FileDataStore(credPath, True)).Result
			    Debug.WriteLine("Credential file saved to: " + credPath)
		    End Using

		    ' Create Google Sheets API service.
		    Dim service = New SheetsService(New BaseClientService.Initializer() With { _
			    .HttpClientInitializer = credential, _
			    .ApplicationName = _applicationName _
		    })

		    ' Define request parameters.
		    Dim spreadsheetId As String = "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
		    Dim range As String = "Class Data!A2:E"
		    Dim request As SpreadsheetsResource.ValuesResource.GetRequest = service.Spreadsheets.Values.Get(spreadsheetId, range)

		    ' Prints the names and majors of students in a sample spreadsheet:
		    ' https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
		    Dim response As ValueRange = request.Execute()
		    Dim values As IList(Of IList(Of Object)) = response.Values

		    If Not IsNothing(values) AndAlso values.Count > 0 Then
			    Debug.WriteLine("Name, Major")

			    For Each row As Object In values
				    ' Print columns A and E, which correspond to indices 0 and 4.
				    Debug.WriteLine("{0}, {1}", row(0), row(4))

                    returnData = returnData + vbCrLf + String.Format("{0}, {1}", row(0), row(4))
			    Next
		    Else
			    Debug.WriteLine("No data found.")
		    End If
        Catch ex As Exception
            Throw New Exception("FUNCTION[" + (New StackFrame()).GetMethod.Name + "] ERROR[" + ex.Message + "] STACKTRACE[" + ex.StackTrace() + "]", ex)
        End Try
		
        Return returnData
	End Function
#End Region
End Class