/**
 * This class creates a person (dot) of caucasian ethnicity at a specific place which has certain methods, including updating and having various properties
 * @class  
 */
class Caucasian extends Person {
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
	 * @param {Number} maritalToggle - determine mode of color shown, to show by marrital status or by ethnicity
	 */
	constructor (name, assessmentID, gender, birthday, maritalStatus, supervisionLevel, decileScores, riskText, totalDecileScore, number, arrayLength, total, startingPoint, zoom, maritalToggle) {
		super(name, assessmentID, gender, birthday, maritalStatus, supervisionLevel, decileScores, riskText, totalDecileScore, number, arrayLength, total, startingPoint, zoom);
		this.maritalToggle = maritalToggle;
	}
	
	/**     
	 * Shows the person (point), with a different color depending on the mode of the visualizaiton 
	 */
	show() {
		noStroke();
		if (this.maritalToggle == 1) {
			if (this.maritalStatus == "Single") {
				fill(0);
			} else if (this.maritalStatus == "Married") {
				fill(255);
			} else if (this.maritalStatus == "Significant Other") {
				fill(255, 0, 0);
			} else if (this.maritalStatus == "Divorced") {
				fill(0, 255, 0);
			} else if (this.maritalStatus == "Widowed") {
				fill(0, 0, 255);
			} else if (this.maritalStatus == "Seperated") {
				fill(255, 0, 255);
			}
			
		} else {
			fill(255, 255, 0);
		}
		square(this.x-1, this.y-1, 2);
	}
	
	/**     
	 * Toggle whether or not to show color by ethnicity or marital status
	 */
	updateMaritalStatus(maritalStatus) {
		this.maritalToggle = maritalStatus;
	}
	
}