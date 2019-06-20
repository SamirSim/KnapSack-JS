function fillElements () {
	bool=1;
	//TODO at this point 'bagWeight' must be initialised
	if (isNaN(document.getElementById("demo-name").value) || document.getElementById("demo-name").value=="") {
		document.getElementById("demo-name").value="";
		alert("Entrer un nombre dans le poids");
	}
	else { 
		bagWeight = parseFloat(document.getElementById("demo-name").value); 
		elements.push([]);
		gain.push([]);
		selected.push([]);
		for(var i = 0; i < table.rows.length-1; i++) { //TODO i < bagWeight+1
			if (isNaN(table.rows[i+1].cells[2].children[0].value) || isNaN(table.rows[i+1].cells[1].children[0].value) || table.rows[i+1].cells[2].children[0].value=="" ||table.rows[i+1].cells[1].children[0].value=='' ) {
				bool=0;
				var str1="myTxt"+(2*i+1);
				var str2="myTxt"+(2*i+2);
				document.getElementById(str1).value="";
				document.getElementById(str2).value="";
				alert("Entrez des nombres dans les champs " +parseInt(i+1));//TODO change the error message
			} 
			else {
				elements.push([parseFloat(table.rows[i+1].cells[2].children[0].value),parseFloat(table.rows[i+1].cells[1].children[0].value)]); // TODO use the correct value of (value,weight)
				gain.push(new Array(bagWeight+1));
				selected.push(new Array(bagWeight+1));
			}
		}
		if (bool) window.location.href="#result";
	}
}

function getMaxGain () {
	var n = elements.length;
	for(var j = 0; j < bagWeight + 1; j++) {
		for(var i = 0; i < n; i++) {
			if(i === 0 || j === 0) {
				if(debug) {
					//TODO  highlight i == 0 or j == 0 , add comment on comment section
				}
				gain[i][j] = 0;
				selected[i][j] = "";
			} 
			else if(elements[i][1] > j) {
				if(debug) {
					//TODO highlight j , add comment on comment section
				}
				gain[i][j] = gain[i-1][j];
				selected[i][j] = selected[i-1][j];
			} 
			else {
				if(debug){
					//TODO highlight elements to compare , add comment on comment section
				}
				var simulateNewGain = parseInt(gain[i-1][j - elements[i][1]]) + parseInt(elements[i][0]);
				var takeElement = (gain[i-1][j] < simulateNewGain);
				if(takeElement) {
					selected[i][j] = selected[i-1][j - elements[i][1]];	
					selected[i][j]+="["+i+"] ";
					gain[i][j] = simulateNewGain;
					if(debug){
						//TODO add to comment section
					}
				}
				else {
					if(debug){
						//highlight gain[i-1][j] TODO add to comment section
					}
					gain[i][j] = gain[i-1][j];
					selected[i][j] = selected[i-1][j];
				} 
			}
		}
	}
	return gain[n-1][bagWeight];
}