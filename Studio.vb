'------------------------------------------------------------------------------
' <auto-generated>
'     This code was generated from a template.
'
'     Manual changes to this file may cause unexpected behavior in your application.
'     Manual changes to this file will be overwritten if the code is regenerated.
' </auto-generated>
'------------------------------------------------------------------------------

Imports System
Imports System.Collections.Generic

Partial Public Class Studio
    Public Property id As Integer
    Public Property name As String
    Public Property url As String
    Public Property lastUpdate As Nullable(Of Date)

    Public Overridable Property Sites As ICollection(Of Site) = New HashSet(Of Site)

End Class
