/**
 * This class creates a person (dot) at a specific place which has certain methods, including updating and having various properties
 * @class  
 */
class Person {
	/**
	 * This is required to hold information for each person, and is also used to plot them in the circular visualization
	 *
	 * @constructor
	 *
	 * @param {String} name - name of the person
	 * @param {Number} assessmentID - assessment id of the person's case
	 * @param {String} gender - gender of the person
	 * @param {String} birthday - person's birthday
	 * @param {String} maritalStatus - marital status of the person, used for color
	 * @param {Number} supervisionLevel - reccomended level of supervision for each people, used for plotting
	 * @param {Array} riskText - specific text relating to individual decile ratings
	 * @param {Array} decileScores - individual decile ratings
	 * @param {Number} totalDecileScores - total decile scores, used for plotting
	 * @param {Number} number - the placement of the person in their array, or their index value, used in plotting
	 * @param {Number} arrayLength - total length of the array person is in
	 * @param {Number} total - total number of people in entire dataset
	 * @param {Number} startingPoint - the angle (in radians) of the startign point for each category
	 * @param {Number} zoom - current zoom number, used for plotting
	 * @param {Number} mode - plotting mode, either by supervision level or by total decile scores
	 */
	constructor (name, assessmentID, gender, birthday, maritalStatus, supervisionLevel, decileScores, riskText, totalDecileScore, number, arrayLength, total, startingPoint, zoom, mode) {
		
		// configuring variables
		this.name = name;
		this.assessmentID = assessmentID;
		this.gender = gender;
		this.birthday = birthday;
		this.maritalStatus = maritalStatus;
		this.supervisionLevel = supervisionLevel;
		this.decileScores = decileScores;
		this.riskText = riskText;
		this.totalDecileScore = totalDecileScore;
		this.zoom = zoom;
		
		this.number = number;
		this.arrayLength = arrayLength;
		this.total = total;
		this.startingPoint = startingPoint;
		this.angle = map(this.number, 0, this.arrayLength, this.startingPoint, this.startingPoint + Math.PI * 2 * this.arrayLength/this.total);
		
		this.totalShiftX = 0;
		this.totalShiftY = 0;
		
		this.mode = mode;
		
		this.highlighted = 0;
		
		// determine the polar coordinates for a specific point using variables above
		if (this.mode == 0) {
			this.x = windowWidth/3 + this.totalDecileScore * Math.cos(this.angle) * this.zoom + Math.random()*3 + this.totalShiftX;
			this.y = windowHeight/3 + this.totalDecileScore * Math.sin(this.angle) * this.zoom + Math.random()*3 + this.totalShiftY;
		} else {
			this.x = windowWidth/3 + this.supervisionLevel * Math.cos(this.angle) * this.zoom * 7.5 + this.totalShiftX - Math.random()*3;
			this.y = windowHeight/3 + this.supervisionLevel * Math.sin(this.angle) * this.zoom * 7.5 + this.totalShiftY - Math.random()*3;
		}
	}
	
	/**     
	 * Shows the person (point), and checks to see if person is highlighted
	 */
	show() {
		circle(this.x, this.y, 2);
		
		if (this.highlighted == 1) {
			noFill();
			strokeWeight(2);
			stroke(255, 120, 0);
			circle(this.x, this.y, 10);
		}
	}
	
	/**     
	 * Updates the zoom value based on how much the user has zoomed in, updates and replots values
	 *
	 * @param {Number} zoom - updated zoom value
	 */
	updateZoom(zoom) {
		// updates all the values in the star needed for accurate placement
		this.zoom = zoom;
		
		// updates coords
		if (this.mode == 0) {
			this.x = windowWidth/3 + this.totalDecileScore * Math.cos(this.angle) * this.zoom + Math.random()*3 + this.totalShiftX;
			this.y = windowHeight/3 + this.totalDecileScore * Math.sin(this.angle) * this.zoom + Math.random()*3 + this.totalShiftY;
		} else {
			this.x = windowWidth/3 + this.supervisionLevel * Math.cos(this.angle) * this.zoom * 7.5 + this.totalShiftX - Math.random()*3;
			this.y = windowHeight/3 + this.supervisionLevel * Math.sin(this.angle) * this.zoom * 7.5 + this.totalShiftY - Math.random()*3;
		}
		
		// checks if object is highlighted
		if (this.highlighted == 1) {
			noFill();
			strokeWeight(2);
			stroke(255, 120, 0);
			circle(this.x, this.y, 10);
		}
	}
	
	/**     
	 * Shows the text with a set brightness and coordinates
	 *
	 * @param {Number} totalShiftX - total shifted value on the x axis, used to move all points when panning
	 * @param {Number} totalShiftY - total shifted value on the y axis, used to move all points when panning
	 */
	updateShift(totalShiftX, totalShiftY) {
		this.totalShiftX = totalShiftX;
		this.totalShiftY = totalShiftY;
		
		// replot all coords
		if (this.mode == 0) {
			this.x = windowWidth/3 + this.totalDecileScore * Math.cos(this.angle) * this.zoom + Math.random()*3 + this.totalShiftX;
			this.y = windowHeight/3 + this.totalDecileScore * Math.sin(this.angle) * this.zoom + Math.random()*3 + this.totalShiftY;
		} else {
			this.x = windowWidth/3 + this.supervisionLevel * Math.cos(this.angle) * this.zoom * 7.5 + this.totalShiftX - Math.random()*3;
			this.y = windowHeight/3 + this.supervisionLevel * Math.sin(this.angle) * this.zoom * 7.5 + this.totalShiftY - Math.random()*3;
		}
		
		if (this.highlighted == 1) {
			noFill();
			strokeWeight(2);
			stroke(255, 120, 0);
			circle(this.x, this.y, 10);
		}
	}
	
	/**     
	 * Updates the mode when the user presses the buttons to switch from supervision to decile, or vice versa
	 *
	 * @param {Number} mode - updated mode
	 */
	updateMode(mode) {
		this.mode = mode;
		
		// replot coords
		if (this.mode == 0) {
			this.x = windowWidth/3 + this.totalDecileScore * Math.cos(this.angle) * this.zoom + Math.random()*3 + this.totalShiftX;
			this.y = windowHeight/3 + this.totalDecileScore * Math.sin(this.angle) * this.zoom + Math.random()*3 + this.totalShiftY;
		} else {
			this.x = windowWidth/3 + this.supervisionLevel * Math.cos(this.angle) * this.zoom * 7.5 + this.totalShiftX - Math.random()*3;
			this.y = windowHeight/3 + this.supervisionLevel * Math.sin(this.angle) * this.zoom * 7.5 + this.totalShiftY - Math.random()*3;
		}
		
		// checks highlights
		if (this.highlighted == 1) {
			noFill();
			strokeWeight(2);
			stroke(255, 120, 0);
			circle(this.x, this.y, 10);
		}
	}
	
	/**     
	 * Highlights the object, changes highlight value
	 */
	highlight() {
		this.highlighted = 1;
	}
	
	/**     
	 * Unhighlights the object, changes highlight value
	 */
	unHighlight() {
		this.highlighted = 0;
	}
	
}