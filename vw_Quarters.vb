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

Partial Public Class vw_Quarters
    Public Property Quarter_Id As Integer
    Public Property Quarter_ReleaseDate As Nullable(Of Date)
    Public Property Quarter_ReleaseOrder As Nullable(Of Integer)
    Public Property Quarter_MintagePhiladelphia As Nullable(Of Integer)
    Public Property Quarter_MintageDenver As Nullable(Of Integer)
    Public Property Quarter_MintageTotal As Nullable(Of Integer)
    Public Property Quarter_ElementsDepicted As String
    Public Property Quarter_BannerText As String
    Public Property Quarter_Caption1Text As String
    Public Property Quarter_Caption2Text As String
    Public Property Quarter_Engraver As String
    Public Property Quarter_ImageFileName As String
    Public Property Quarter_Notes As String
    Public Property QuarterType_Id As Nullable(Of Integer)
    Public Property QuarterType_Code As String
    Public Property QuarterType_ShortDescription As String
    Public Property QuarterType_LongDescription As String
    Public Property QuarterType_ImageFileName As String
    Public Property Location_Id As Nullable(Of Integer)
    Public Property Location_Code As String
    Public Property Location_Name As String
    Public Property Location_OfficialDate As Nullable(Of Date)
    Public Property ContainingLocation_Id As Nullable(Of Integer)
    Public Property ContainingLocation_Code As String
    Public Property ContainingLocation_Name As String
    Public Property LocationType_Id As Nullable(Of Integer)
    Public Property LocationType_ShortDescription As String
    Public Property LocationType_LongDescription As String
    Public Property QuarterStatus_Id As Nullable(Of Integer)
    Public Property QuarterStatus_MintPhiladelphia As Nullable(Of Byte)
    Public Property QuarterStatus_MintDenver As Nullable(Of Byte)

End Class
