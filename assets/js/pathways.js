var arrYears = [];
var arrSets = [];
var styleWrapperInit = 'wrapper init';
var styleWrapper = '';

function ConsoleLog(getMsg){
    // console.log('[CL] ' + getMsg)
}

function updateStatusString(arrYears, arrSets) {
	// document.getElementById('txt-years').innerHTML = JSON.stringify(arrYears) + ' (' + arrYears.length + ')';
	// document.getElementById('txt-sets').innerHTML = JSON.stringify(arrSets) + ' (' + arrSets.length + ')';
	// document.getElementById('txt-classes').innerHTML = JSON.stringify(arrYears) + ' (' + arrYears.length + ')';

	styleWrapper = 'wrapper y' + arrYears.length + ' s' + arrSets[arrSets.length - 1];
	$('#pw-wrap').attr('class', styleWrapper);
	for (i = 0; i < arrYears.length; i++) {
		var tmpClass = 'y' + arrYears[i] + '_s' + arrSets[i];
		$('#pw-wrap').addClass(tmpClass);
	}

	if (arrYears.length > 1) {
		var yDiff = 0;
		var lineUpOrDown = '';
		if (arrSets[arrSets.length - 1] >= arrSets[arrSets.length - 2]) {
			yDiff = arrSets[arrSets.length - 1] - arrSets[arrSets.length - 2];
			lineUpOrDown = 'down v-' + yDiff;
		} else {
			yDiff = arrSets[arrSets.length - 2] - arrSets[arrSets.length - 1];
			lineUpOrDown = 'up v-' + yDiff;
		}
		var lineDiv = 'column-line-wrap y' + arrYears.length;
		ConsoleLog('[updateStatusString] | lineDiv: ' + lineDiv);
		$('.column-line-wrap.y' + arrYears.length).attr(
			'class',
			lineDiv + ' xxx ' + lineUpOrDown + ' from-S' + arrSets[arrSets.length - 2]
		);
	}
}

function updateSet(getYear, getSet) {
	arrSets[getYear - 1] = getSet;
	ConsoleLog('[updateSet] | SET ' + getSet);

	for (i = 0; i < 5; i++) {
		if (i > getYear) {
			$('.column.y' + i).attr('class', 'column y' + i);
			$('.column-line-wrap.y' + i).attr('class', 'column-line-wrap init y' + i);
		}
	}

	$('.column.y' + getYear).attr('class', 'column y' + getYear + ' s' + getSet);
	updateStatusString(arrYears, arrSets);
}

function btnPathways(getYear, getSet) {
	ConsoleLog('[btnPathways] | --------------------');
	ConsoleLog('[btnPathways] | Year and Set = ' + getYear + ', ' + getSet);

	var isClickable = $('.btn.y' + getYear + '.s' + getSet + ' span').css('cursor') != 'not-allowed' ? true : false;
	if (!isClickable) return;

	if (!arrYears.length && getYear == 1) {
		arrYears.push(getYear);
		arrSets.push(getSet);
		updateSet(getYear, getSet);
		// ConsoleLog('[btnPathways] | YR | START | Year ' + getYear + ', ' + getSet);
	} else if (arrYears.length == getYear) {
		// ConsoleLog('[btnPathways] | YR | NO CHANGE | Year ' + getYear + ', ' + getSet);
		updateSet(getYear, getSet);
		// ConsoleLog('[btnPathways] | > SET Year ' + getYear);
	} else if (arrYears.length == getYear - 1) {
		arrYears.push(getYear);
		arrSets.push(getSet);
		updateSet(getYear, getSet);
		// ConsoleLog('[btnPathways] | > YR | SET | Year ' + getYear + ', ' + getSet);
	} else if (getYear < arrYears.length + 1) {
		arrYears.splice(getYear, arrYears.length - getYear);
		arrSets.splice(getYear, arrSets.length - getYear);
		updateSet(getYear, getSet);
		// ConsoleLog('[btnPathways] | < YR | GO BACK | Year ' + getYear + ', ' + getSet);
	}
	// updateSet(getYear,getSet);
	// updateStatusString(arrYears,arrSets);
	ConsoleLog('[btnPathways] | OPACITY: ' + $('.btn.y2.s4').css('opacity'));
}

//REF:
/*
  https://stackoverflow.com/questions/26568536/remove-all-items-after-an-index/26568611
  https://www.quackit.com/html/templates/css_flexbox_templates.cfm
*/

document.addEventListener('DOMContentLoaded', function() {
	try {
		MicroModal.init({
			awaitCloseAnimation: true, // set to false, to remove close animation
			onShow: function(modal) {
				ConsoleLog('[DOMContentLoaded] | micromodal open');
			},
			onClose: function(modal) {
				ConsoleLog('[DOMContentLoaded] | micromodal close');
			}
		});
	} catch (e) {
		ConsoleLog('micromodal error: ', e);
	}
});
