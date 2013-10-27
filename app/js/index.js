// detect environment


(function () {
	'use strict';
	
    $('#menu-toggle').click(function (e) {
		e.preventDefault();
        $('#wrapper').toggleClass('active');
    });
	window.getSettings = function(){
		if (!$fs.existsSync("data.json")){
			// keine einstellungen
			return false;
			
		}
		var dataJson = $fs.readFileSync("data.json", "utf-8");
		dataJson = JSON.parse(dataJson);
		window.$mainAccount = dataJson.main;
		window.$mainPassword = dataJson.password;
		window.$mail = dataJson.mail;
		$(".main").val(dataJson.main);
		$(".email").html($mail);
		$(".emailField").html($mail);
		$(".password").val(dataJson.password);
	}
	
	
	
	window.$view = $("div[data-view-container]")
	window.$emailField = $(".mail");
	$view.changeView = function(view){
		var path = ["templates/", view, ".html"].join("");
		$.ajax({
			url: path,
			type: "GET",
			success: function(data) {
				window.$view.html(data);
				// travers back form URL to view
				var view = this.url.split('templates/')[1].split(".html")[0];
				$(".activeMenu").removeClass("activeMenu");
				$("a[data-view=" + view + "]").addClass("activeMenu");
				
				getSettings();
			}
		});
	}
	var initView = $view.data("default-view");
	$view.changeView(initView);
	
	window.$mail = null;
	$("a[data-view]").on("click", function(e){
		e.preventDefault();
		var view = $(this).data("view");
		$view.changeView(view);
	});
	
	window.get10MinuteMail = function get10MinuteMail(){
		// yeah. get dat mail.
		
	}
	window.$request = require("request").defaults({jar: true});
	window.$fs = require("fs");
	if (!$fs.existsSync("index.cj")){
		$fs.writeFileSync("index.cj", "100");
	}
	window.getSettings();
	$(".emailField").html($mail);
	// $(".emailField").html("Connecting...");
// 	window.$mailCheck = setInterval(function(){
// 	
// 		$request.post({ url: "http://trashmail.ws/", form: {getemail: "E-Mail-Adresse erstellen"}}, function(err, r, b){
// 			$request.get({ url: "http://trashmail.ws"}, function(err, r, b){
// 				
// 				window.$mail = b.split('<input type="text" name="mail" value="')[1].split('"')[0];
// 				$(".emailField").html($mail);
// 				
// 				if (b.indexOf("Metin2 - Deine Anmeldung") > -1){
// 					$(".statusBar").slideDown();
// 					$(".statusBar span").html("Activating Metin2 Account.. Please wait");
// 					var link = b.split('<td rowspan="3"><a href="')[1].split('"')[0];
// 					$request.get({ url: "http://trashmail.ws/" + link}, function(err, r, b){
// 						window.$r = r;
// 						$(".statusBar span").html("Connecting to Metin2.de Server...");
// 						l = b.split("gameforge.com/user/authenticated/")[1].split('"')[0];
// 						l = "http://de.metin2.gameforge.com/user/authenticated/" + l;
// 						$request.get({ url: l}, function(err, r, b){
// 							$(".statusBar").slideUp();
// 							alert("Account activated!");
// 							dropMail();
// 						});
// 					});
// 				}
// 			})
// 			
// 		})
// 	}, 3000)
	window.dropMail = function(){
			$request.post({ url: "http://trashmail.ws", form: {ditchemail: "E-Mail-Adresse wegwerfen"}}, function(e, r, b){
				$(".emailField").html("Waiting for new Mail");
				window.$mail = null;
			});
		}
	$("body").on("click", ".newMail", dropMail)
	
	
	
	// 10minutemail (not implemented)
	// window.$mailCheck = setInterval(function(){
// 		$request.get({ url: "http://10minutemail.com"}, function(err, r, b){
// 			var mail = b.split(' is your temporary e-mail address.')[0].split('<br/>')[1];
// 			window.$mail = mail;
// 			if ($mail.indexOf("too quickly") > -1){
// 				clearInterval($mailCheck);
// 				mail = prompt("Die Sucker @ 10minutemail haben dich gesperrt. Gebe eine alternative Mail Adresse ein:");
// 				window.$mail = mail;
// 			}
// 			$(".emailField").html($mail)
// 			if (b.indexOf("noreply@gameforge.com") > -1){
// 				$(".status").html("Activating Account..");
// 				var mailLink = b.split('noreply@gameforge.com</td>')[1].split('Metin2 - Deine Anmeldung')[0];
// 				mailLink = mailLink.split('href=\"')[1].split('\"')[0];
// 				window.mailLink = mailLink;
// 				$request.get({ url: "http://10minutemail.com" + mailLink}, function(err, r, b){
// 					window.$b = r;
// 				});
// 				
// 			}
// 		})
// 		
// 	}, 5000);
//window.$mail = "pascal@raszyk.de";
	window.$server = 51; // daimos
	window.$reich = 2; // 2 = chunjo
	window.$getChar = [
		[0, 4],
		[5, 1],
		[2, 6],
		[7, 3]
	];
	window.createChar = function(){
		$request.get({ url: "http://de.metin2.gameforge.com/creation/step1/" + $reich}, function(){
			$request.get({ url: "http://de.metin2.gameforge.com/creation/step2/" + $charCode + "/"}, function(){
				$request.post({ url: "http://de.metin2.gameforge.com/creation/step3", form: {server: $server, name: $charName} }, function(){
					alert("Account erstellt!");
				});
			});
		});
	}
	window.display_char = function(){

		var k = $(".char-type").val();
		var s = $(".char-sex").val();
		if (s == null){
			$(".char-img").attr("src", "../img/w"+k+".png");
		}
		else {
			k = parseInt(k, 10);
			s = parseInt(s, 10);
			window.$charCode = window.$getChar[k][s];
			$(".char-img").attr("src", "../img/" + $charCode + ".png");
		}
			
	}
	$("body").on("change",".char-type", display_char);
	$("body").on("change", ".char-sex", display_char);
	window.reset = function(){
		$view.changeView("index");
	}
	window.createM2Account = function(name, mail, pass, char){
		var data = {
			username: name,
			email: mail,
			password: pass,
			tac: "tac"
		}
		window.lastAccount = data;
		$(".status").html("Create M2 Account..");
		$request.post({url: "http://de.metin2.gameforge.com/user/register", form: data}, function(error, response, body){
			window.$r = response;
			if (typeof $r.headers.location === "undefined"){ alert("Account konnte nicht erstellt werden. Schon vorhanden?");  reset(); return false; }
			
			else if (response.headers.location.indexOf("captcha") > -1){
			
				// lets assume this worked.
				// grab the fucking captcha
				$(".status").html("Waiting for Captcha Verification");
				var captchaPipe = $request.get("http://de.metin2.gameforge.com/captcha/create");
				captchaPipe.on("end", function(){
					$(".captchaField").slideDown();
					$(".captchaField img").attr("src", "../captcha.png")
				});
				captchaPipe.pipe($fs.createWriteStream("captcha.png"));
			} else if (response.headers.location.indexOf("authenticated") > -1){
				//$(".status").html("Waiting for mail to hit: " + $mail);
				if ($mail.indexOf("trashmail") == -1){
					alert("Account erstellt. Bitte E-Mail best&auml;tigen");
					reset();
				}
				
			}
		});
	}
	
	$(".submitCaptcha").on("click", function(){
		var input = $(".captchaInput").val();
		$(".captchaInput").val("");
		$(".captchaField").slideUp();
		$(".status").html("Finish account generation..");
		$request.post({url: "http://de.metin2.gameforge.com/captcha", form: {SubmitCaptchaForm: "Senden",answer: input}}, function(err, r, body){
			$request.get({url: "http://de.metin2.gameforge.com/user/register"}, function(e, r, b){
				$(".status").html("Waiting for mail to hit: " + $mail);
			})
		});
	});
	
	
	//createM2Account("dermainaccount11", "pascal@raszyk.de", "peniskopp", {char: "Schamane", sex: "female", name:"FrauMitBusen2"});
	//$mail = "pascal@raszyk.de";
	$("body").on("click", ".createAccount", function(){
		var charName = $(".charName").val();
		if ($mail == null){ alert("Noch keine Trashmail bekommen... Warte ca. 5 Sekunden"); return false; }
		$view.changeView("loading");
		window.$charName = charName;
		getSettings();
		var counter = parseInt($fs.readFileSync("index.cj", "utf-8"));
		window.$tMainAccount = $mainAccount + counter;
		counter++;
		$fs.writeFileSync("index.cj", counter);
		createM2Account(window.$tMainAccount, $mail, window.$mainPassword);
	});
	$("body").on("click", ".saveSettings", function(){
		var d = {};
		d.main = $(".main").val();
		d.password = $(".password").val();
		d.mail = $(".email").val();
		$fs.writeFileSync("data.json", JSON.stringify(d));
		alert("Gespeichert!");
	});
	
	
})();