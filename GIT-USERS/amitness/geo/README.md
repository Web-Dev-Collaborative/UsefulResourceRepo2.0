# vdc.geojson file creation

`vdc.geojson` was created from Nepal shapefile data downloaded from http://gadm.org. The zip of shapefile data was uploaded to http://www.mapshaper.org and then downloaded as geojson data for administrative level 4, the village development committee level.

# vdc.geojson property structure example

Below is a snippet from the `vdc.geojson` file. It is the properties element for one of the VDCs.

* The VDC is Bageswari
* It is in the Bhaktapur district
* It is in the Bagmati Zone
* It is in the Central Development Region
* It is in the country of Nepal

```json
{
  "ID_0": 157,
  "ISO": "NPL",
  "NAME_0": "Nepal",
  "ID_1": 1,
  "NAME_1": "Central",
  "ID_2": 1,
  "NAME_2": "Bagmati",
  "ID_3": 1,
  "NAME_3": "Bhaktapur",
  "ID_4": 1,
  "NAME_4": "Bageswari",
  "VARNAME_4": "",
  "CCN_4": 0,
  "CCA_4": "",
  "TYPE_4": "Village development committee",
  "ENGTYPE_4": "Village development committee"
}
```

# wz-vdc.geojson file creation

`wz-vdc.geojson` was created by editing the properties element for each entry in the `vdc.geojson` file.

# wz-vdc.topojson file creation

`wz-vdc.topojson` was created by uploading `wz-vdc.geojson` to http://www.mapshaper.org and then exporting it as topojson data

