function BallPong(ballId) {
	var angle = 30;
	var speed = 500;
	var size = 50;

	var defaultAngle = 0;
	var defaultSpeed = 0;
	var defaultSize = 10;

	var fieldWidth = 800;
	var fieldHeight = 500;

	var ballX = 0;
	var ballY = 0;

	var isStarted = false;

	var timerMilliseconds = 20;

	var ballObj;

	var intervalObj;


	this.setAngle = function(newAngle) {
		angle = newAngle;
	};
	this.setSpeed = function(newSpeed) {
		speed = newSpeed;
	};
	this.setSize = function(newSize) {
		size = newSize;
	};

	this.getDefaultAngle = function() {
		return defaultAngle;
	};
	this.getDefaultSpeed = function() {
		return defaultSpeed
	};
	this.getDefaultSize = function() {
		return defaultSize;
	};

	this.setFieldWidth = function(width) {
		fieldWidth = width;
	};
	this.getFieldWidth = function() {
		return fieldWidth;
	};

	this.setFieldHeight = function(height) {
		fieldHeight = height;
	};
	this.getFieldHeight = function() {
		return fieldHeight;
	};

	this.start = function() {
		isStarted = true;

		ballObj = $('#' + ballId);
		ballObj.css('position', 'relative');

		intervalObj = setInterval(ballPong.timer, timerMilliseconds);
	};

	this.stop = function() {
		isStarted = false;

		if (intervalObj) {
			clearInterval(intervalObj);
		}
	};

	this.getIsStarted = function() {
		return isStarted;
	};

	this.timer = function() {
		var distance = timerMilliseconds * speed / 1000;

		var deltaX = distance * Math.cos(angle * (Math.PI / 180));
		var deltaY = distance * Math.sin(angle * (Math.PI / 180));

		// Check boundaries
		var newX = ballX + deltaX;
		var newY = ballY + deltaY;

		if (newX + size > fieldWidth || newX < 0 || newY + size > fieldHeight || newY < 0) {
			if (newX + size > fieldWidth) {
				if (angle < 90) {
					angle = 180 - angle;
				}
				else if (angle == 0) {
					angle = 180;
				}
				else if (angle > 270) {
					angle = 540 - angle;
				}
			}
			else if (newX < 0) {
				if (angle < 180) {
					angle = 180 - angle;
				}
				else if (angle == 180) {
					angle = 0;
				}
				else if (angle > 180) {
					angle = 540 - angle;
				}
			}
			else if (newY + size > fieldHeight) {
				if (angle > 90) {
					angle = 360 - angle;
				}
				else if (angle == 90) {
					angle = 270;
				}
				else if (angle < 90) {
					angle = 360 - angle;
				}
			}
			else if (newY < 0) {
				if (angle > 270) {
					angle = 360 - angle;
				}
				else if (angle == 270) {
					angle = 90;
				}
				else if (angle <270) {
					angle = 360 - angle;
				}
			}

			deltaX = distance * Math.cos(angle * (Math.PI / 180));
			deltaY = distance * Math.sin(angle * (Math.PI / 180));

			$('#angle').val(angle);
		}

		ballX += deltaX;
		ballY += deltaY;

		// Correct in case of ball size changing
		if (ballX + size > fieldWidth) {
			ballX = fieldWidth - size;
		}
		else if (ballY + size > fieldHeight) {
			ballY = fieldHeight - size;
		}

		ballPong.draw();
	};

	this.draw = function() {
		ballObj
			.css('top', parseInt(ballY) + 'px')
			.css('left', parseInt(ballX) + 'px');
	}

}