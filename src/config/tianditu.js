export default {
    vec:`<?xml version="1.0" encoding="UTF-8"?>
    <Capabilities
        xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://schemas.opengis.net/wmts/1.0.0/wmtsGetCapabilities_response.xsd"
        version="1.0.0" xmlns="http://www.opengis.net/wmts/1.0"
        xmlns:ows="http://www.opengis.net/ows/1.1"
        xmlns:gml="http://www.opengis.net/gml"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink">
        <ows:ServiceIdentification>
            <ows:Title>鍦ㄧ嚎鍦板浘鏈嶅姟</ows:Title>
            <ows:Abstract>鍩轰簬OGC鏍囧噯鐨勫湴鍥炬湇鍔�</ows:Abstract>
            <ows:Keywords>
                <ows:Keyword>OGC</ows:Keyword>
            </ows:Keywords>
            <ows:ServiceType codeSpace="wmts"/>
            <ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion>
            <ows:Fees>none</ows:Fees>
            <ows:AccessConstraints>none</ows:AccessConstraints>
        </ows:ServiceIdentification>
        <ows:ServiceProvider>
            <ows:ProviderName>鍥藉鍩虹鍦扮悊淇℃伅涓績</ows:ProviderName>
            <ows:ProviderSite>http://www.tianditu.com</ows:ProviderSite>
            <ows:ServiceContact>
                <ows:IndividualName>Mr Liu</ows:IndividualName>
                <ows:PositionName>Software Engineer</ows:PositionName>
                <ows:ContactInfo>
                    <ows:Phone>
                        <ows:Voice>010-88187700</ows:Voice>
                        <ows:Facsimile>010-88187700</ows:Facsimile>
                    </ows:Phone>
                    <ows:Address>
                        <ows:DeliveryPoint>鍖椾含甯傛捣娣€鍖鸿幉鑺辨睜瑗胯矾28鍙�</ows:DeliveryPoint>
                        <ows:City>鍖椾含甯�</ows:City>
                        <ows:AdministrativeArea>鍖椾含甯�</ows:AdministrativeArea>
                        <ows:Country>涓浗</ows:Country>
                        <ows:PostalCode>101399</ows:PostalCode>
                        <ows:ElectronicMailAddress>tianditu.com</ows:ElectronicMailAddress>
                    </ows:Address>
                    <ows:OnlineResource xlink:type="simple" xlink:href="http://www.tianditu.com"/>
                </ows:ContactInfo>
            </ows:ServiceContact>
        </ows:ServiceProvider>
        <ows:OperationsMetadata>
            <ows:Operation name="GetCapabilities">
                <ows:DCP>
                    <ows:HTTP>
                        <ows:Get xlink:href="http://t0.tianditu.com/vec_w/wmts?">
                            <ows:Constraint name="GetEncoding">
                                <ows:AllowedValues>
                                    <ows:Value>KVP</ows:Value>
                                </ows:AllowedValues>
                            </ows:Constraint>
                        </ows:Get>
                    </ows:HTTP>
                </ows:DCP>
            </ows:Operation>
            <ows:Operation name="GetTile">
                <ows:DCP>
                    <ows:HTTP>
                        <ows:Get xlink:href="http://t0.tianditu.com/vec_w/wmts?">
                            <ows:Constraint name="GetEncoding">
                                <ows:AllowedValues>
                                    <ows:Value>KVP</ows:Value>
                                </ows:AllowedValues>
                            </ows:Constraint>
                        </ows:Get>
                    </ows:HTTP>
                </ows:DCP>
            </ows:Operation>
        </ows:OperationsMetadata>
        <Contents>
            <Layer>
                <ows:Title>vec</ows:Title>
                <ows:Abstract>vec</ows:Abstract>
                <ows:Identifier>vec</ows:Identifier>
                <ows:WGS84BoundingBox>
                    <ows:LowerCorner>-20037508.3427892 -20037508.3427892</ows:LowerCorner>
                    <ows:UpperCorner>20037508.3427892 20037508.3427892</ows:UpperCorner>
                </ows:WGS84BoundingBox>
                <ows:BoundingBox>
                    <ows:LowerCorner>-20037508.3427892 -20037508.3427892</ows:LowerCorner>
                    <ows:UpperCorner>20037508.3427892 20037508.3427892</ows:UpperCorner>
                </ows:BoundingBox>
                <Style>
                    <ows:Identifier>default</ows:Identifier>
                </Style>
                <Format>tiles</Format>
                <TileMatrixSetLink>
                    <TileMatrixSet>w</TileMatrixSet>
                </TileMatrixSetLink>
            </Layer>
            <TileMatrixSet>
                <ows:Identifier>w</ows:Identifier>
                <ows:SupportedCRS>urn:ogc:def:crs:EPSG::900913</ows:SupportedCRS>
                <TileMatrix>
                    <ows:Identifier>1</ows:Identifier>
                    <ScaleDenominator>2.958293554545656E8</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>2</MatrixWidth>
                    <MatrixHeight>2</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>2</ows:Identifier>
                    <ScaleDenominator>1.479146777272828E8</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>4</MatrixWidth>
                    <MatrixHeight>4</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>3</ows:Identifier>
                    <ScaleDenominator>7.39573388636414E7</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>8</MatrixWidth>
                    <MatrixHeight>8</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>4</ows:Identifier>
                    <ScaleDenominator>3.69786694318207E7</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>16</MatrixWidth>
                    <MatrixHeight>16</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>5</ows:Identifier>
                    <ScaleDenominator>1.848933471591035E7</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>32</MatrixWidth>
                    <MatrixHeight>32</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>6</ows:Identifier>
                    <ScaleDenominator>9244667.357955175</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>64</MatrixWidth>
                    <MatrixHeight>64</MatrixHeight>
                </TileMatrix>
                      <TileMatrix>
                    <ows:Identifier>7</ows:Identifier>
                    <ScaleDenominator>4622333.678977588</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>128</MatrixWidth>
                    <MatrixHeight>128</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>8</ows:Identifier>
                    <ScaleDenominator>2311166.839488794</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>256</MatrixWidth>
                    <MatrixHeight>256</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>9</ows:Identifier>
                    <ScaleDenominator>1155583.419744397</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>512</MatrixWidth>
                    <MatrixHeight>512</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>10</ows:Identifier>
                    <ScaleDenominator>577791.7098721985</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>1024</MatrixWidth>
                    <MatrixHeight>1024</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>11</ows:Identifier>
                    <ScaleDenominator>288895.85493609926</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>2048</MatrixWidth>
                    <MatrixHeight>2048</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>12</ows:Identifier>
                    <ScaleDenominator>144447.92746804963</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>4096</MatrixWidth>
                    <MatrixHeight>4096</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>13</ows:Identifier>
                    <ScaleDenominator>72223.96373402482</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>8192</MatrixWidth>
                    <MatrixHeight>8192</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>14</ows:Identifier>
                    <ScaleDenominator>36111.98186701241</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>16384</MatrixWidth>
                    <MatrixHeight>16384</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>15</ows:Identifier>
                    <ScaleDenominator>18055.990933506204</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>32768</MatrixWidth>
                    <MatrixHeight>32768</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>16</ows:Identifier>
                    <ScaleDenominator>9027.995466753102</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>65536</MatrixWidth>
                    <MatrixHeight>65536</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>17</ows:Identifier>
                    <ScaleDenominator>4513.997733376551</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>131072</MatrixWidth>
                    <MatrixHeight>131072</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>18</ows:Identifier>
                    <ScaleDenominator>2256.998866688275</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>262144</MatrixWidth>
                    <MatrixHeight>262144</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>19</ows:Identifier>
                    <ScaleDenominator>1128.4994333441375</ScaleDenominator>
                    <TopLeftCorner>90.0 -180.0</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>524288</MatrixWidth>
                    <MatrixHeight>262144</MatrixHeight>
                </TileMatrix>
            </TileMatrixSet>
        </Contents>
    </Capabilities>`,
    cva:`<?xml version="1.0" encoding="UTF-8"?>
    <Capabilities
        xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://schemas.opengis.net/wmts/1.0.0/wmtsGetCapabilities_response.xsd"
        version="1.0.0" xmlns="http://www.opengis.net/wmts/1.0"
        xmlns:ows="http://www.opengis.net/ows/1.1"
        xmlns:gml="http://www.opengis.net/gml"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink">
        <ows:ServiceIdentification>
            <ows:Title>鍦ㄧ嚎鍦板浘鏈嶅姟</ows:Title>
            <ows:Abstract>鍩轰簬OGC鏍囧噯鐨勫湴鍥炬湇鍔�</ows:Abstract>
            <ows:Keywords>
                <ows:Keyword>OGC</ows:Keyword>
            </ows:Keywords>
            <ows:ServiceType codeSpace="wmts"/>
            <ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion>
            <ows:Fees>none</ows:Fees>
            <ows:AccessConstraints>none</ows:AccessConstraints>
        </ows:ServiceIdentification>
        <ows:ServiceProvider>
            <ows:ProviderName>鍥藉鍩虹鍦扮悊淇℃伅涓績</ows:ProviderName>
            <ows:ProviderSite>http://www.tianditu.com</ows:ProviderSite>
            <ows:ServiceContact>
                <ows:IndividualName>Mr Liu</ows:IndividualName>
                <ows:PositionName>Software Engineer</ows:PositionName>
                <ows:ContactInfo>
                    <ows:Phone>
                        <ows:Voice>010-88187700</ows:Voice>
                        <ows:Facsimile>010-88187700</ows:Facsimile>
                    </ows:Phone>
                    <ows:Address>
                        <ows:DeliveryPoint>鍖椾含甯傛捣娣€鍖鸿幉鑺辨睜瑗胯矾28鍙�</ows:DeliveryPoint>
                        <ows:City>鍖椾含甯�</ows:City>
                        <ows:AdministrativeArea>鍖椾含甯�</ows:AdministrativeArea>
                        <ows:Country>涓浗</ows:Country>
                        <ows:PostalCode>101399</ows:PostalCode>
                        <ows:ElectronicMailAddress>tianditu.com</ows:ElectronicMailAddress>
                    </ows:Address>
                    <ows:OnlineResource xlink:type="simple" xlink:href="http://www.tianditu.com"/>
                </ows:ContactInfo>
            </ows:ServiceContact>
        </ows:ServiceProvider>
        <ows:OperationsMetadata>
            <ows:Operation name="GetCapabilities">
                <ows:DCP>
                    <ows:HTTP>
                        <ows:Get xlink:href="http://t0.tianditu.com/cva_w/wmts?">
                            <ows:Constraint name="GetEncoding">
                                <ows:AllowedValues>
                                    <ows:Value>KVP</ows:Value>
                                </ows:AllowedValues>
                            </ows:Constraint>
                        </ows:Get>
                    </ows:HTTP>
                </ows:DCP>
            </ows:Operation>
            <ows:Operation name="GetTile">
                <ows:DCP>
                    <ows:HTTP>
                        <ows:Get xlink:href="http://t0.tianditu.com/cva_w/wmts?">
                            <ows:Constraint name="GetEncoding">
                                <ows:AllowedValues>
                                    <ows:Value>KVP</ows:Value>
                                </ows:AllowedValues>
                            </ows:Constraint>
                        </ows:Get>
                    </ows:HTTP>
                </ows:DCP>
            </ows:Operation>
        </ows:OperationsMetadata>
        <Contents>
            <Layer>
                <ows:Title>cva</ows:Title>
                <ows:Abstract>cva</ows:Abstract>
                <ows:Identifier>cva</ows:Identifier>
                <ows:WGS84BoundingBox>
                    <ows:LowerCorner>-20037508.3427892 -20037508.3427892</ows:LowerCorner>
                    <ows:UpperCorner>20037508.3427892 20037508.3427892</ows:UpperCorner>
                </ows:WGS84BoundingBox>
                <ows:BoundingBox>
                    <ows:LowerCorner>-20037508.3427892 -20037508.3427892</ows:LowerCorner>
                    <ows:UpperCorner>20037508.3427892 20037508.3427892</ows:UpperCorner>
                </ows:BoundingBox>
                <Style>
                    <ows:Identifier>default</ows:Identifier>
                </Style>
                <Format>tiles</Format>
                <TileMatrixSetLink>
                    <TileMatrixSet>w</TileMatrixSet>
                </TileMatrixSetLink>
            </Layer>
            <TileMatrixSet>
                <ows:Identifier>w</ows:Identifier>
                <ows:SupportedCRS>urn:ogc:def:crs:EPSG::900913</ows:SupportedCRS>
                <TileMatrix>
                    <ows:Identifier>1</ows:Identifier>
                    <ScaleDenominator>2.958293554545656E8</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>2</MatrixWidth>
                    <MatrixHeight>2</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>2</ows:Identifier>
                    <ScaleDenominator>1.479146777272828E8</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>4</MatrixWidth>
                    <MatrixHeight>4</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>3</ows:Identifier>
                    <ScaleDenominator>7.39573388636414E7</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>8</MatrixWidth>
                    <MatrixHeight>8</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>4</ows:Identifier>
                    <ScaleDenominator>3.69786694318207E7</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>16</MatrixWidth>
                    <MatrixHeight>16</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>5</ows:Identifier>
                    <ScaleDenominator>1.848933471591035E7</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>32</MatrixWidth>
                    <MatrixHeight>32</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>6</ows:Identifier>
                    <ScaleDenominator>9244667.357955175</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>64</MatrixWidth>
                    <MatrixHeight>64</MatrixHeight>
                </TileMatrix>
                    <TileMatrix>
                    <ows:Identifier>7</ows:Identifier>
                    <ScaleDenominator>4622333.678977588</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>128</MatrixWidth>
                    <MatrixHeight>128</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>8</ows:Identifier>
                    <ScaleDenominator>2311166.839488794</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>256</MatrixWidth>
                    <MatrixHeight>256</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>9</ows:Identifier>
                    <ScaleDenominator>1155583.419744397</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>512</MatrixWidth>
                    <MatrixHeight>512</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>10</ows:Identifier>
                    <ScaleDenominator>577791.7098721985</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>1024</MatrixWidth>
                    <MatrixHeight>1024</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>11</ows:Identifier>
                    <ScaleDenominator>288895.85493609926</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>2048</MatrixWidth>
                    <MatrixHeight>2048</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>12</ows:Identifier>
                    <ScaleDenominator>144447.92746804963</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>4096</MatrixWidth>
                    <MatrixHeight>4096</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>13</ows:Identifier>
                    <ScaleDenominator>72223.96373402482</ScaleDenominator>
                    <TopLeftCorner>20037508.3427892 -20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>8192</MatrixWidth>
                    <MatrixHeight>8192</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>14</ows:Identifier>
                    <ScaleDenominator>36111.98186701241</ScaleDenominator>
                    <TopLeftCorner>-20037508.3427892 20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>16384</MatrixWidth>
                    <MatrixHeight>16384</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>15</ows:Identifier>
                    <ScaleDenominator>18055.990933506204</ScaleDenominator>
                    <TopLeftCorner>-20037508.3427892 20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>32768</MatrixWidth>
                    <MatrixHeight>32768</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>16</ows:Identifier>
                    <ScaleDenominator>9027.995466753102</ScaleDenominator>
                    <TopLeftCorner>-20037508.3427892 20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>65536</MatrixWidth>
                    <MatrixHeight>65536</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>17</ows:Identifier>
                    <ScaleDenominator>4513.997733376551</ScaleDenominator>
                    <TopLeftCorner>-20037508.3427892 20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>131072</MatrixWidth>
                    <MatrixHeight>131072</MatrixHeight>
                    </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>18</ows:Identifier>
                    <ScaleDenominator>2256.998866688275</ScaleDenominator>
                    <TopLeftCorner>-20037508.3427892 20037508.3427892</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>262144</MatrixWidth>
                    <MatrixHeight>262144</MatrixHeight>
                </TileMatrix>
                <TileMatrix>
                    <ows:Identifier>19</ows:Identifier>
                    <ScaleDenominator>1128.4994333441375</ScaleDenominator>
                    <TopLeftCorner>90.0 -180.0</TopLeftCorner>
                    <TileWidth>256</TileWidth>
                    <TileHeight>256</TileHeight>
                    <MatrixWidth>524288</MatrixWidth>
                    <MatrixHeight>262144</MatrixHeight>
                </TileMatrix>
            </TileMatrixSet>
        </Contents>
    </Capabilities>`
}