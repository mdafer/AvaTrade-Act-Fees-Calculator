console.log("running");
function checkLoggedIn()
{
	console.log('waiting login');
	if($(".aclite-top-value.aclite-top-value-balance").text())
		loggedIn();
	else
		setTimeout(checkLoggedIn, 500);
}
function loggedIn()
{
	console.log("loggedInDetected");
	checkOrdersLoaded();
}
function checkOrdersLoaded()
{
	console.log("waiting to load orders");
	if($("#ui-id-4").children().length)
	{
		setTimeout(calculateFees, 1500);
		setInterval(shortenNames, 2000);
	}
	else
		setTimeout(checkOrdersLoaded, 1500);
}
function shortenNames()
{
	var SPLongName = $('#ui-id-2').find(".actlite-openpos-pair-name");
	var SPLongDesc = $('#ui-id-2').find(".actlite-openpos-pair-descr");
	for(var i =0; i<SPLongName.length;i++)
	{
		if(SPLongName[i] && SPLongName[i].innerText == "S&P 500 VIX Short-Term Futures ETN")
			$(SPLongName[i]).text("S&P 500");

		if(SPLongDesc[i] && SPLongDesc[i].innerText == "iPATH S&P 500 VIX Short-Term Futures ETN")
			$(SPLongDesc[i]).remove();
	}
}
function calculateFees()
{
	var FeesArr = [];
	var numberArr = $('#ui-id-4').find(".actlite-if-show-amt");
	var openRateArr = $('#ui-id-4').find(".actlite-closedpos-rate.col2");
	var closeRateArr = $('#ui-id-4').find(".actlite-closedpos-rate.actlite-closedpos-closerate.col4");
	var buySell = $('#ui-id-4').find("[class*=actlite-sbcolor]");
	var netWorthArr = $('#ui-id-4').find(".actlite-closedpos-pl");
	for(var i =0; i<numberArr.length;i++)
	{
		var number = parseFloat(numberArr[i].innerText.replace('$','').replace(',',''));
		var openRate = parseFloat(openRateArr[i].innerText.replace('$','').replace(',',''));
		var closeRate = parseFloat(closeRateArr[i].innerText.replace('$','').replace(',',''));
		var netWorth = parseFloat(netWorthArr[i].innerText.replace('$','').replace("−","-").replace(',',''));
		if(buySell[i].innerText=="BUY")
			FeesArr[i] = parseFloat(((number*(closeRate-openRate))-netWorth).toFixed(5));
		else
			FeesArr[i] = parseFloat(((number*(openRate-closeRate))-netWorth).toFixed(5));
		if(FeesArr[i]!=0)
		{
			if(FeesArr[i]<0)
				color="green";
			else
				color = "red";
			$(netWorthArr[i]).parent().after('<div><div class="actlite-closedpos-pl-label">Fees $:</div><div class="actlite-closedpos-pl"><span style="color:'+color+'"> $'+FeesArr[i]+"</span></div></div>");
		}
	}
    console.log(FeesArr.reduce((a, b) => a + b, 0));
}

$(document).ready(function () {
	checkLoggedIn();
});