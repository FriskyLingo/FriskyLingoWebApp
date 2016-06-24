Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration

''' <summary>
''' A encapsulated connection with simple open/close methods.
''' </summary>
''' <remarks></remarks>
Public Class c_Data_Connection


    Private _useTrans As Boolean
    Public ReadOnly Property UseTrans() As Boolean
        Get
            Return _useTrans
        End Get
    End Property


    Private _trans As SqlTransaction
    Public Property Trans() As SqlTransaction
        Get
            Return _trans
        End Get
        Set(ByVal value As SqlTransaction)
            _useTrans = True
            _trans = value
        End Set
    End Property


    Private _connection As SqlConnection
    Public Property Connection() As SqlConnection
        Get
            Return _connection
        End Get
        Set(ByVal value As SqlConnection)
            _connection = value
        End Set
    End Property


    Private _connectionString As String
    Public Property ConnectionString() As String
        Get
            Return _connectionString
        End Get
        Set(ByVal value As String)
            _connectionString = value
        End Set
    End Property

    ''' <summary>
    ''' Opens the connection
    ''' </summary>
    ''' <remarks></remarks>
    Public Sub OpenConnection()
        Try
            Connection = New SqlConnection(ConnectionString)
            Connection.Open()
        Catch ex As Exception
            Throw New Exception(ex.Message, ex)
        End Try
    End Sub

    ''' <summary>
    ''' Opens the connection with connectionstring param.
    ''' </summary>
    ''' <param name="connectionString"></param>
    ''' <remarks></remarks>
    Public Sub OpenConnection(ByVal connectionString As String)
        Try
            Connection = New SqlConnection(connectionString)
            Connection.Open()
        Catch ex As Exception
            Throw ex
        End Try
    End Sub

    ''' <summary>
    ''' Closes the connection.
    ''' </summary>
    ''' <remarks>
    ''' CPS 5/20/2011 Added checks for null reference on connection.
    ''' </remarks>
    Public Sub CloseConnection()
        Try
            If Not IsNothing(Connection) Then
                If Connection.State = ConnectionState.Open Then
                    Connection.Close()
                End If
            End If
        Catch ex As Exception
            Throw New Exception(ex.Message, ex)
        Finally
            If Not IsNothing(Connection) Then
                Connection.Dispose()
            End If
        End Try
    End Sub

    ''' <summary>
    ''' Creates and begins a new transaction on the connection
    ''' </summary>
    ''' <remarks></remarks>
    Public Sub BeginTransaction()
        Try
            _useTrans = True
            Trans = Connection.BeginTransaction()
        Catch ex As Exception
            Throw ex
        End Try
    End Sub

    ''' <summary>
    ''' Commits the transaction and disposes of the object.
    ''' </summary>
    ''' <remarks></remarks>
    Public Sub CommitTransaction()
        Try
            Trans.Commit()
        Catch ex As Exception
            Throw ex
        Finally
            _useTrans = False
            Trans.Dispose()
        End Try
    End Sub
End Class
