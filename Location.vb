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

Partial Public Class Location
    Public Property id As Integer
    Public Property locationTypeId As Integer
    Public Property code As String
    Public Property name As String
    Public Property officialDate As Nullable(Of Date)
    Public Property lastUpdate As Nullable(Of Date)

    Public Overridable Property lu_LocationType As lu_LocationType
    Public Overridable Property NationalSites As ICollection(Of NationalSite) = New HashSet(Of NationalSite)
    Public Overridable Property NationalSites1 As ICollection(Of NationalSite) = New HashSet(Of NationalSite)
    Public Overridable Property Quarters As ICollection(Of Quarter) = New HashSet(Of Quarter)

End Class
