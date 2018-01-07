/* eslint-disable */

/**
 * Navbar Code
 */

window.onload = () => {
	wRs();
	/* If ($(document).width() < 1024) {
        $("#navMenuMain").hide()
    }*/
	if (authenticated) {
		$("#navUserToggle").hover(() => {
			$("#navUserToggle").addClass("is-active");
		}, () => {
			$("#navUserToggle").removeClass("is-active");
		});
	}
	if (transparent) {
		$(window).on("scroll", () => {
			if ($(window).scrollTop() > 60) {
				$("#navMenu").removeClass("transparent");
			} else {
				$("#navMenu").addClass("transparent");
			}
		});
	}
	$(window).on("scroll", () => {
		if ($(window).scrollTop() > 60) {
			if ($(window).width() >= 1024) {
				$("#navMenu").css("padding", "0px");
			}
		} else if ($(window).width() > 1024) {
			$("#navMenu").css("padding", "16px");
		}
	});
	$(window).resize(() => wRs());
	function wRs () {
		if ($(window).width() < 1024) {
			$("#navMenu").css("padding", "0px");
			$("#navMenuMain").hide();
		}
		if ($(window).width() >= 1024) {
			$("#navMenuMain").show();
			if ($(window).scrollTop() < 60) {
				$("#navMenu").css("padding", "16px");
			} else {
				$("#navMenu").css("padding", "0px");
			}
		}
	}
	$("#navMenuToggle").click(() => {
		$("#navMenuToggle").toggleClass("is-active");
		$("#navMenuMain").slideToggle(86);
	});
};

/**
 * Theme/Cookies Code
 */

function setTheme (theme) {
	Cookies.set("theme", theme);
	window.location = window.location;
}
