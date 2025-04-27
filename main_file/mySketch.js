/* 
	COMPAS Data Display
	Victor Yu
	Created: 2025-01-06
	Modified: 2025-01-12
	Purpose: To show the data of a compas database
*/

/* Testing Values
	Kevin Fisher
	Willie Wiggins
	Dennis Davey
	Damieth Richardson
	Dionte Alexander-Wilcox
*/


// declare values

let africanAmericanPlotted = [];
let caucasianPlotted = [];
let hispanicPlotted = [];
let asianPlotted = [];
let otherPlotted = [];

let personArray = [];

let originalPersonArray;

let searched = 0;
let person;

let zoom = 7;
let total = 0;
let startingPoint = 0;
let totalShiftX = 0;
let totalShiftY = 0;
let mode = 0;

let maritalToggle = 0;

let sortOption, searchOption;

/*
* function to pre-load the data
*/
function preload() {
	loadTable('./compas-scores-raw.csv', handleData);
}

/*
* function to extract data and put it into arrays of data
*/
function handleData(data) {
	for (let i = 1; i < data.getRowCount(); i = i + 3) { // goes through every row
		if (data.get(i, 1) >= 57075 && Number(data.get(i, 23)) + Number(data.get(i + 1, 23)) + Number(data.get(i + 2, 23)) >= 3) { // see if data fufills requirements
			total += 1; // counter for total # of people, used for % calculations
			
			// sorts into different child classes by ethnicity
			if (data.get(i, 8) == "African-American") {
				africanAmericanPlotted.push({
											"assessmentID": data.get(i, 1),
											"name": (data.get(i, 5) + " " + data.get(i, 4)).toUpperCase(),
											"gender": data.get(i, 7),
											"birthday": data.get(i, 9),
											"maritalStatus": data.get(i, 16),
											"supervisionLevel": data.get(i, 18),
											"decileScores": [data.get(i, 23), data.get(i + 1, 23), data.get(i + 2, 23)],
											"riskText": [data.get(i, 21), data.get(i + 1, 21), data.get(i + 2, 21)],
											"totalDecileScore": Number(data.get(i, 23)) + Number(data.get(i + 1, 23)) + Number(data.get(i + 2, 23)),
											"number": africanAmericanPlotted.length
										});
			} if (data.get(i, 8) == "Caucasian") {
				caucasianPlotted.push({
											"assessmentID": data.get(i, 1),
											"name": (data.get(i, 5) + " " + data.get(i, 4)).toUpperCase(),
											"gender": data.get(i, 7),
											"birthday": data.get(i, 9),
											"maritalStatus": data.get(i, 16),
											"supervisionLevel": data.get(i, 18),
											"decileScores": [data.get(i, 23), data.get(i + 1, 23), data.get(i + 2, 23)],
											"riskText": [data.get(i, 21), data.get(i + 1, 21), data.get(i + 2, 21)],
											"totalDecileScore": Number(data.get(i, 23)) + Number(data.get(i + 1, 23)) + Number(data.get(i + 2, 23)),
											"number": caucasianPlotted.length
										});
			} if (data.get(i, 8) == "Hispanic") {
				hispanicPlotted.push({
											"assessmentID": data.get(i, 1),
											"name": (data.get(i, 5) + " " + data.get(i, 4)).toUpperCase(),
											"gender": data.get(i, 7),
											"birthday": data.get(i, 9),
											"maritalStatus": data.get(i, 16),
											"supervisionLevel": data.get(i, 18),
											"decileScores": [data.get(i, 23), data.get(i + 1, 23), data.get(i + 2, 23)],
											"riskText": [data.get(i, 21), data.get(i + 1, 21), data.get(i + 2, 21)],
											"totalDecileScore": Number(data.get(i, 23)) + Number(data.get(i + 1, 23)) + Number(data.get(i + 2, 23)),
											"number": hispanicPlotted.length
										});
			} if (data.get(i, 8) == "Asian") {
				asianPlotted.push({
											"assessmentID": data.get(i, 1),
											"name": (data.get(i, 5) + " " + data.get(i, 4)).toUpperCase(),
											"gender": data.get(i, 7),
											"birthday": data.get(i, 9),
											"maritalStatus": data.get(i, 16),
											"supervisionLevel": data.get(i, 18),
											"decileScores": [data.get(i, 23), data.get(i + 1, 23), data.get(i + 2, 23)],
											"riskText": [data.get(i, 21), data.get(i + 1, 21), data.get(i + 2, 21)],
											"totalDecileScore": Number(data.get(i, 23)) + Number(data.get(i + 1, 23)) + Number(data.get(i + 2, 23)),
											"number": asianPlotted.length
										});
			} if (data.get(i, 8) == "Other") {
				otherPlotted.push({
											"assessmentID": data.get(i, 1),
											"name": (data.get(i, 5) + " " + data.get(i, 4)).toUpperCase(),
											"gender": data.get(i, 7),
											"birthday": data.get(i, 9),
											"maritalStatus": data.get(i, 16),
											"supervisionLevel": data.get(i, 18),
											"decileScores": [data.get(i, 23), data.get(i + 1, 23), data.get(i + 2, 23)],
											"riskText": [data.get(i, 21), data.get(i + 1, 21), data.get(i + 2, 21)],
											"totalDecileScore": Number(data.get(i, 23)) + Number(data.get(i + 1, 23)) + Number(data.get(i + 2, 23)),
											"number": otherPlotted.length
										});
			}
		}
	}
}

function setup() {
	// create canvas
	createCanvas(windowWidth/1.5, windowHeight/1.5);
	background(100);
	
	// create radio buttons for sorting options
	sortOption = createRadio();
	sortOption.option('Bubble Sort');
	sortOption.option('Quick Sort')
	sortOption.selected('Quick Sort');
	
	// create radio buttons for searching options
	searchOption = createRadio();
	searchOption.option('Linear Search');
	searchOption.option('Binary Search');
	searchOption.option('Recursive Binary Search');
	searchOption.selected('Binary Search');
	
	// plot starting legend
	legend(0, 0);
	noStroke();
	
	// create new objects based on different data arrays, put them all in one array
	
	for (let i of africanAmericanPlotted) {
		africanAmericanPerson = new AfricanAmerican(i.name, i.assessmentID, i.gender, i.birthday, i.maritalStatus, i.supervisionLevel, i.decileScores, i.riskText, i.totalDecileScore, i.number, africanAmericanPlotted.length, total, startingPoint, zoom, mode);
		personArray.push(africanAmericanPerson);
		africanAmericanPerson.show();
	}
	
	// reset starting point for circular chart plotting
	startingPoint = 0.0092 + startingPoint + Math.PI * 2 * africanAmericanPlotted.length/total;
	
	for (let i of caucasianPlotted) {
		caucasianPerson = new Caucasian(i.name, i.assessmentID, i.gender, i.birthday, i.maritalStatus, i.supervisionLevel, i.decileScores, i.riskText, i.totalDecileScore, i.number, caucasianPlotted.length, total, startingPoint, zoom, mode);
		personArray.push(caucasianPerson);
		caucasianPerson.show();
	}
	
	startingPoint = 0.0092 + startingPoint + Math.PI * 2 * caucasianPlotted.length/total;
	
	for (let i of hispanicPlotted) {
		hispanicPerson = new Hispanic(i.name, i.assessmentID, i.gender, i.birthday, i.maritalStatus, i.supervisionLevel, i.decileScores, i.riskText, i.totalDecileScore, i.number, hispanicPlotted.length, total, startingPoint, zoom, mode);
		personArray.push(hispanicPerson);
		hispanicPerson.show();
	}
	
	startingPoint = 0.0092 + startingPoint + Math.PI * 2 * hispanicPlotted.length/total;
	
	
	for (let i of asianPlotted) {
		asianPerson = new Asian(i.name, i.assessmentID, i.gender, i.birthday, i.maritalStatus, i.supervisionLevel, i.decileScores, i.riskText, i.totalDecileScore, i.number, asianPlotted.length, total, startingPoint, zoom, mode);
		personArray.push(asianPerson);
		asianPerson.show();
	}
	
	startingPoint = 0.0092 + startingPoint + Math.PI * 2 * asianPlotted.length/total;
	
	for (let i of otherPlotted) {
		otherPerson = new Other(i.name, i.assessmentID, i.gender, i.birthday, i.maritalStatus, i.supervisionLevel, i.decileScores, i.riskText, i.totalDecileScore, i.number, otherPlotted.length, total, startingPoint, zoom, mode);
		personArray.push(otherPerson);
		otherPerson.show();
	}
	
	// preserve array for sorting purposes
	originalPersonArray = personArray;
}

function draw() {
	
	// try showing info for person, else just show default search text
	try {
		fill(0);
		text(`Name: ${person.name}`, windowWidth/1.5 - 150, windowHeight/1.5 - 65);
		text(`Assessment ID: ${person.assessmentID}`, windowWidth/1.5 - 150, windowHeight/1.5 - 55);
		text(`Gender: ${person.gender}`, windowWidth/1.5 - 150, windowHeight/1.5 - 45);
		text(`Birthday: ${person.birthday}`, windowWidth/1.5 - 150, windowHeight/1.5 - 35);
		text(`Marital Status: ${person.maritalStatus}`, windowWidth/1.5 - 150, windowHeight/1.5 - 25);
		text(`Supervision Level: ${person.supervisionLevel}`, windowWidth/1.5 - 150, windowHeight/1.5 - 15);
		text(`Total Decile Score: ${person.totalDecileScore}`, windowWidth/1.5 - 150, windowHeight/1.5 - 5);
	} catch {
		document.getElementById("sortTimeText").innerHTML = `Search a name`
	}
	
	
	if (keyIsDown(37) == true) { // if left arrow is pressed, move visual left and replot everything
		background(100);
		totalShiftX -= 5 * zoom/10;
		legend(totalShiftX, totalShiftY);
		for (let personPoint of personArray) {
				personPoint.updateShift(totalShiftX, totalShiftY);
				personPoint.show();
		}
	} else if (keyIsDown(39) == true) { // if right arrow is pressed, move visual right and replot everything
		background(100);
		totalShiftX += 5 * zoom/10;
		legend(totalShiftX, totalShiftY);
		for (let personPoint of personArray) {
				personPoint.updateShift(totalShiftX, totalShiftY);
				personPoint.show();
		}
	}
	
	if (keyIsDown(38) == true) { // if up arrow is pressed, move visual up and replot everything
		background(100);
		totalShiftY -= 5 * zoom/10;
		legend(totalShiftX, totalShiftY);
		for (let personPoint of personArray) {
				personPoint.updateShift(totalShiftX, totalShiftY);
				personPoint.show();
		}
	} else if (keyIsDown(40) == true) { // if down arrow is pressed, move visual down and replot everything
		background(100);
		totalShiftY += 5 * zoom/10;
		legend(totalShiftX, totalShiftY);
		for (let personPoint of personArray) {
				personPoint.updateShift(totalShiftX, totalShiftY);
				personPoint.show();
		}
	}
}

/*
* function to detect when the mouse scroll is used to zoom in or out
*
*/
function mouseWheel(event) {
	background(100);
	if (event.delta < 0) { // zoom out and change zoom value variable
		zoom += Math.round(1 + zoom/10);
	} else { // zoom in and change zoom value variable
		if (zoom > 1) {
			zoom -= Math.round(1 + zoom/10);
		}
	}
	// replot everything
	legend(totalShiftX, totalShiftY);
	for (let personPoint of personArray) {
		personPoint.updateZoom(zoom);
		personPoint.show();
	}
}

/*
 * Function that creates the circles legend underneath the visualization to show intensity
 * 
 * @param {Number} centerX - x coord for the center of the circles
 * @param {Number} centerY - y coord for the center of the circles
 */
function legend(centerX, centerY) {
	// draw the various circles on the given coords
	noFill();
	strokeWeight(10 * zoom);
	stroke(115, 100, 100);
	circle(windowWidth/3 + centerX, windowHeight/3 + centerY, 50 * zoom);
	stroke(110, 110, 100);
	circle(windowWidth/3 + centerX, windowHeight/3 + centerY, 30 * zoom);
	stroke(100, 115, 100);
	circle(windowWidth/3 + centerX, windowHeight/3 + centerY, 10 * zoom);
}

/*
 * A function that changes the visualization when button is pressed, change to total decile score
 */
function modeSwitchD() {
	// switch modes
	mode = 0;
	
	// replot everything
	background(100);
	legend(totalShiftX, totalShiftY);
	for (let personPoint of personArray) {
			personPoint.updateMode(mode);
			personPoint.show();
	}
}

/*
 * A function that changes the visualization when button is pressed, change to supervision level
 */
function modeSwitchS() {
	// switch modes
	mode = 1;
	
	// replot everything
	background(100);
	legend(totalShiftX, totalShiftY);
	for (let personPoint of personArray) {
			personPoint.updateMode(mode);
			personPoint.show();
	}
}

/*
 * A function that changes the color displayed on the visualization when toggled
 */
function modeSwitchM() {
	// toggle the variable value
	if (maritalToggle == 0) {
		maritalToggle = 1;
	} else {
		maritalToggle = 0;
	}
	
	// replot everything
	background(100);
	legend(totalShiftX, totalShiftY);
	for (let personPoint of personArray) {
			personPoint.updateMaritalStatus(maritalToggle);
			personPoint.show();
	}
}

/*
 * Searches for a certain name for an object 
 * 
 * @param {String} searchTerm - The term to search for
 */
function linearSearch(searchTerm) {
	// iterates through entire array to try and find any matches
	for (let i = 0; i < personArray.length; i++) {
		if (personArray[i].name == searchTerm) {
			return i;
		}
	}
	// else return nothing
	return -1;
}

/*
 * Searches for a certain name for an object 
 * 
 * @param {String} searchTerm - The term to search for
 */
function binarySearch(searchTerm) {
	let min = 0;
  let max = personArray.length;

	// keeps running until it lands on one term thats the closest to the search term
  while (min < max) {
    let middle = Math.floor((min + max) / 2);
    
    if (personArray[middle].name < searchTerm) {
      min = middle + 1;
    } else {
      max = middle;
    }
  }
	// if that term is the same as the search term then return it, else return error
	if (personArray[min].name == searchTerm) {
		return min;
	} else {
		return -1;
	}
}

/*
 * Searches for a certain name for an object 
 * 
 * @param {Array} array - Array to search
 * @param {String} searchTerm - The term to search for
 * @param {Number} min - Min index to search in
 * @param {Number} max - Max index to search in
 */
function recursiveBinarySearch(array, searchTerm, min, max) { 
	
	// if object is not found
	if (min > max) {
		return -1; 
	}

	// find middle index of array
	mid = Math.floor((min + max) / 2); 

	// if value is the search term, return it, else rerun function w/ recursion depending on placement 
	if (array[mid].name === searchTerm) {
		return mid; 
	} else if (array[mid].name > searchTerm) { 
		return recursiveBinarySearch(array, searchTerm, min, mid - 1); 
	} else { 
		return recursiveBinarySearch(array, searchTerm, mid + 1, max); 
	} 
} 

/*
 * Sorts people in an array based on a given attribute
 * 
 * @param {Any} attribute - The attribute to sort by
 */
function bubbleSort(attribute) {
	let i;
	let j;
	let temp;
	let swapped;
	let sortTimeStart, sortTimeEnd;
	
	// starting timer
	sortTimeStart = millis();
	
	for (i = 0; i < personArray.length - 1; i++) {
		
			swapped = false;
		
			for (j = 0; j < personArray.length - i - 1; j++) {
				
					if (personArray[j][attribute] > personArray[j + 1][attribute]) {
							temp = personArray[j];
							personArray[j] = personArray[j + 1];
							personArray[j + 1] = temp;
							swapped = true;
					}
				
			}

			if (swapped == false) {
				break;
			}
	}
	
	sortTimeEnd = millis();
	
	return sortTimeEnd - sortTimeStart;
}

/*
 * Sorts people in an array based on a given attribute
 * 
 * @param {Any} attribute - The attribute to sort by
 */
function quickSort(attribute) {
	
	// starting timer to return total time value
	let sortTimeStart, sortTimeEnd;
	
	sortTimeStart = millis();
	
	// sorting
	personArray.sort((a, b) => {
		if (typeof a[attribute] === 'string') {
			return a[attribute].localeCompare(b[attribute]);
		} else {
			return a[attribute] - b[attribute]
		}
	});
	
	sortTimeEnd = millis();
	
	return sortTimeEnd - sortTimeStart;
}

/*
 * This is the function that runs when the search button is pressed, taking information from the search bar and applying the sorting and searching algorithms to it
 * 
 */
function search() {
	
	// highlight the person if they exist
	try {
		person.unHighlight();
	} catch {}
	
	personArray = originalPersonArray;
	
	// sorting the array before searching
	if (sortOption.value() == 'Bubble Sort') {
		document.getElementById("sortTimeText").innerHTML = `Time to sort array is ${bubbleSort("name")} ms`;
	} else {
		document.getElementById("sortTimeText").innerHTML = `Time to sort array is ${quickSort("name")} ms`;
	}
	
	// starting the searching timer
	searchTimeStart = millis();
	
	// searching for the value in the search bar
	if (searchOption.value() == 'Linear Search') {
		person = personArray[linearSearch(document.getElementById("searchBar").value.toUpperCase())]; 
	} else if (searchOption.value() == 'Binary Search') {
		person = personArray[binarySearch(document.getElementById("searchBar").value.toUpperCase())]; 
	} else {
		person = personArray[recursiveBinarySearch(personArray, document.getElementById("searchBar").value.toUpperCase(), 0, personArray.length - 1)]; 
	}
	
	// if object not found, don't show and show an error message, else display the object
	if (person == undefined) {
		searched = 0;
		document.getElementById("searchTimeText").innerHTML = `Object not found. Try again.`;
	} else {
		searchTimeEnd = millis();
		person.highlight();
		document.getElementById("searchTimeText").innerHTML = `Time to find object is ${searchTimeEnd - searchTimeStart} ms`;
		console.log(person);
	}
}