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

Partial Public Class Quarter
    Public Property id As Integer
    Public Property quarterTypeId As Integer
    Public Property locationId As Integer
    Public Property releaseDate As Nullable(Of Date)
    Public Property releaseOrder As Nullable(Of Integer)
    Public Property mintagePhiladelphia As Nullable(Of Integer)
    Public Property mintageDenver As Nullable(Of Integer)
    Public Property mintageTotal As Nullable(Of Integer)
    Public Property elementsDepicted As String
    Public Property bannerText As String
    Public Property caption1Text As String
    Public Property caption2Text As String
    Public Property engraver As String
    Public Property imageFileName As String
    Public Property lastUpdate As Nullable(Of Date)

    Public Overridable Property Location As Location
    Public Overridable Property QuarterStatus As ICollection(Of QuarterStatus) = New HashSet(Of QuarterStatus)
    Public Overridable Property lu_QuarterType As lu_QuarterType

End Class