/**
****************************************************************
*	Name    : getStockList
*	Author  : Kony 
*	Purpose : This function invokes Google stock API.
****************************************************************
*/

function getStockList()
{
	var stockList = { serviceID:"getStock"};
	var getStock = appmiddlewareinvokerasync(stockList, stockListCallback);
	//kony.application.showLoadingScreen("loadingSkin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
	
}

/**
****************************************************************
*	Name    : stockListCallback
*	Author  : Kony 
*	Purpose : This function is service callback function to fetch SubCategories list.
****************************************************************
*/
function stockListCallback(status, stocksList)
{
		
		if(status == 400){
			 var tmp =[];
			 if(( stocksList!=null || stocksList!= undefined ) && stocksList["opstatus"]==0){
			 	stockResultTable = stocksList["stocks"];
			 	for(var i=0;i<stocksList["stocks"].length;i++){
						tmp.push({
							"lblTicker":stocksList["stocks"][i]["symbol"],
							"lblName":stocksList["stocks"][i]["company"],
							"lblPrice":"$"+stocksList["stocks"][i]["price"],
							"imgStock":stocksList["stocks"][i]["imgUrl"]
								});
						}
					frmStockList.segStock.setData(tmp);
					frmStockList.show();		
			 		//kony.application.dismissLoadingScreen(); 
	   				                 
			 } 
			else{
	            	alert("Please check network connection and try again.");    	
	   				//kony.application.dismissLoadingScreen(); 
	   		}
		}
}
/**
****************************************************************
*	Name    : segStockPage
*	Author  : Kony 
*	Purpose : This function is to full stock list in page view.
****************************************************************
*/

function segStockPage()
{
	var tmp = [];
	var img = "";
	for(var i=0;i<stockResultTable.length;i++){
	 img= stockResultTable[i]["imgUrl"].replace("&amp;","&");
		tmp.push({
		     "lblTicker":stockResultTable[i]["symbol"],
		     "imgStock":"https://www.google.com"+img,
		     "lblCompany":stockResultTable[i]["company"],
		     "lblPrice":stockResultTable[i]["price"],
		     "lblUSD":stockResultTable[i]["currency"]
		     });
	}
	
  frmStockPage.segstock.setData(tmp);
}
/**
****************************************************************
*	Name    : getStockDetails
*	Author  : Kony 
*	Purpose : This function is to get full stock detils.
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