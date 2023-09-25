const menuItems = document.querySelectorAll(".nav-list a");
const mobileItems = document.querySelectorAll(".nav-mobile .list-item");
const scrollSpySections = document.querySelectorAll(".section");
const lastSection = document.querySelector(".nav-list a.contact");
const hamburger = document.querySelector(".hamburger");
const navMobile = document.querySelector(".nav-mobile");
const username = document.querySelector("#username");
const phoneNumber = document.querySelector("#phone-number");
const email = document.querySelector("#mail");
const textArea = document.querySelector("#text-content");
const clearBtn = document.querySelector(".form-buttons .clear");
const sendBtn = document.querySelector(".form-buttons .send");
const errorText = document.querySelector(".error-text");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close");

const footerYear = document.querySelector(".footer-year");

const handleScrollSpy = () => {
	if (document.body.classList.contains("main-page")) {
		const sections = [];

		scrollSpySections.forEach((section) => {
			// console.log(window.scrollY);

			// console.log(section.offsetTop);
			// console.log(section.offsetHeight);

			if (window.scrollY <= section.offsetTop + section.offsetHeight - 39) {
				sections.push(section);

				const activeSection = document.querySelector(
					`[href*="${sections[0].id}"]`
				);
				menuItems.forEach((item) => item.classList.remove("active"));

				activeSection.classList.add("active");
			}

			if (
				window.innerHeight + window.scrollY >=
				document.body.offsetHeight - 20
			) {
				menuItems.forEach((item) => item.classList.remove("active"));

				lastSection.classList.add("active");
				// console.log(window.innerHeight);
			}
		});
	}
};

const showNav = () => {
	navMobile.classList.toggle("active");

	mobileItems.forEach((item) => {
		item.addEventListener("click", () => {
			navMobile.classList.remove("active");
		});
	});

	// if (navMobile.classList.contains("active") === true) {
	// 	hamburger.style.display = "none";
	// } else {
	// 	hamburger.style.border = "3px solid red";
	// }
	handleNavItemsAnimation();
	deleteAnimation();
};

const handleNavItemsAnimation = () => {
	let delayTime = 0;

	mobileItems.forEach((item) => {
		item.classList.toggle("nav-items-animation");
		item.style.animationDelay = "." + delayTime + "s";
		delayTime++;
	});
};

const currentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
	console.log(year);
};

const deleteAnimation = () => {
	mobileItems.forEach((item) => {
		item.addEventListener("click", () => {
			mobileItems.forEach((el) => {
				el.classList.remove("nav-items-animation");
			});
		});
	});
};

const showError = (input, msg) => {
	const formBox = input.parentElement;
	console.log(formBox);

	const errorMsg = formBox.querySelector(".error-text");

	formBox.classList.add("error");
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove("error");
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === "") {
			showError(el, el.placeholder);
		} else {
			clearError(el);
			console.log("okejjjj");
		}
	});
};

const checkMail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, "e-mail jest niepoprawny");
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll(".form-box");
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains("error")) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		popup.classList.add("show-popup");
	}

	console.log("error count");
};

const closePopup = () => {
	popup.classList.remove("show-popup");
};

currentYear();

window.addEventListener("scroll", handleScrollSpy);

hamburger.addEventListener("click", showNav);

sendBtn.addEventListener("click", (e) => {
	e.preventDefault();

	checkForm([username, phoneNumber, email, textArea]);
	checkMail(email);
	checkErrors();
});

clearBtn.addEventListener("click", (e) => {
	e.preventDefault();

	[username, phoneNumber, email, textArea].forEach((el) => {
		el.value = "";
		clearError(el);
	});
});

closeBtn.addEventListener("click", closePopup);
