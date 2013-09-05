/**
****************************************************************
*	Name    : getStockList
*	Author  : Kony 
*	Purpose : This function invokes XML service which uses Google Financial API.
****************************************************************
*/

function getStockList()
{
	var stockList = { serviceID:"getStock"};
	var getStock = appmiddlewareinvokerasync(stockList, stockListCallback);
}

/**
****************************************************************
*	Name    : stockListCallback
*	Author  : Kony 
*	Purpose : This function is service callback function to display the stock list on sucess.
****************************************************************
*/
function stockListCallback(status, stocksList)
{
		
		if(status == 400){
			 var stockDetailTmp =[];
			 var pri = "0.00"
			 if(( stocksList!=null || stocksList!= undefined ) && stocksList["opstatus"]==0){
			 	stockResultTable = stocksList["stocks"];
			 	for(var i=0;i<stocksList["stocks"].length;i++){
					pri = stocksList["stocks"][i]["price"]
					if( pri == "")
					  pri = "0.00";
						stockDetailTmp.push({
							"lblTicker":stocksList["stocks"][i]["symbol"],
							"lblName":stocksList["stocks"][i]["company"],
							"lblPrice":"$"+pri,
							"imgStock":stocksList["stocks"][i]["imgUrl"]
								});
				}
					frmStockList.segStock.setData(stockDetailTmp);
					frmStockList.segStock.selectedIndex=[0,0];
					frmStockList.show();		
			 		var device = kony.os.deviceInfo().name;
			 		if(device =='iPad' || device == "thinclient" )
			 		   getStockDetilsTablet();	 
			 		  			                 
			 } 
			else{
	            	alert("Please check network connection and try again.");    	
	   			}
		}
}
/**
****************************************************************
*	Name    : segStockPage
*	Author  : Kony 
*	Purpose : This function is to display stock list in page view.
****************************************************************
*/

function segStockPage()
{
	var stockDetailTmp = [];
	var img = "";
	for(var i=0;i<stockResultTable.length;i++){
	 img= stockResultTable[i]["imgUrl"].replace("&amp;","&");
		stockDetailTmp.push({
		     "lblTicker":stockResultTable[i]["symbol"],
		     "imgStock":"https://www.google.com"+img,
		     "lblCompany":stockResultTable[i]["company"],
		     "lblPrice":stockResultTable[i]["price"],
		     "lblUSD":stockResultTable[i]["currency"]
		     });
	}
	
  frmStockPage.segstock.setData(stockDetailTmp);
}
/**
****************************************************************
*	Name    : getStockDetails
*	Author  : Kony 
*	Purpose : This function is to get complete stock detils of selceted company in the segment.
****************************************************************
*/

function getStockDetails(eventobject)
{
  var symbol = eventobject.selectedItems[0].lblTicker;
  var stockDetails = null;
  for(var i=0;i<stockResultTable.length;i++){
  if(stockResultTable[i]["symbol"]== symbol){
     stockDetails = stockResultTable[i];
     break;
  }
  }
   frmStockDetails.lblTicker.text = stockDetails["symbol"];
   frmStockDetails.imgStock.src = "https://www.google.com"+stockDetails["imgUrl"];
   frmStockDetails.lblCompany.text = stockDetails["company"];
   frmStockDetails.lblExch.text = stockDetails["exchange"];
   frmStockDetails.lblLow.text = stockDetails["low"];
   frmStockDetails.lblHigh.text = stockDetails["high"];
   frmStockDetails.lblLast.text = stockDetails["last"];
   frmStockDetails.lblCurr.text = stockDetails["currency"];
   url = stockDetails["url"].replace("&amp;","&");
   frmStockDetails.show();

}
/**
****************************************************************
*	Name    : getMoreInfo
*	Author  : Kony 
*	Purpose : This function is to get full detils of paticular Stock.
****************************************************************
*/

function getMoreInfo()
{
	kony.application.openURL("https://www.google.com"+url);

}
/**
****************************************************************
*	Name    : getStockDetilsTablet
*	Author  : Kony 
*	Purpose : This function is to display stock detils selected company for tablet channels .
****************************************************************
*/

function getStockDetilsTablet(eventobject)
{
  
  var symbol= null;
  if(eventobject!=null && eventobject!=undefined){
    symbol = eventobject.selectedItems[0].lblTicker;
  }
  else 
  symbol = frmStockList["segStock"]["selectedItems"][0]["lblTicker"];
  
  if(symbol==null || symbol=="")
  	symbol="AAPL";
  var stockDetails = null;
  for(var i=0;i<stockResultTable.length;i++){
  if(stockResultTable[i]["symbol"]== symbol){
     stockDetails = stockResultTable[i];
     break;
  }
  }
  if(stockDetails!=null){
   frmStockList.lblCom.text = stockDetails["company"];
   frmStockList.lblPriceUSD.text = stockDetails["price"]+" "+stockDetails["currency"];
   frmStockList.imgStockChart.src = "https://www.google.com"+stockDetails["imgUrl"];
   frmStockList.lblCom1.text = stockDetails["company"];  
   frmStockList.lblExc.text = stockDetails["exchange"];
   frmStockList.lblLow.text = stockDetails["low"];
   frmStockList.lblHigh.text = stockDetails["high"];
   frmStockList.lblLast.text = stockDetails["last"];
   frmStockList.lblCurr.text = stockDetails["currency"];
   url = stockDetails["url"].replace("&amp;","&");
   }
   frmStockList.show();
  

}
