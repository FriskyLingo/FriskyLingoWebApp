Imports System.Data.SqlClient
Imports System.Data

Public Class bc_Data

    ''' <summary>
    ''' The connection provider.
    ''' </summary>
    ''' <remarks>
    ''' CPS 4/18/2011
    ''' </remarks>
    'Private _connProv As QACLLBL.c_QAC_ConnectionProvider
    'Public Property ConnProv() As QACLLBL.c_QAC_ConnectionProvider
    '    Get
    '        Return _connProv
    '    End Get
    '    Set(ByVal value As QACLLBL.c_QAC_ConnectionProvider)
    '        _connProv = value
    '    End Set
    'End Property


    Private _conn As c_Connection
    Public Property Conn() As c_Connection
        Get
            Return _conn
        End Get
        Set(ByVal value As c_Connection)
            _conn = value
        End Set
    End Property
End Class
