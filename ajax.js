function setup(){
    
    
}
$(document).ready(setup);



var getUser;
var getNat;
var nat;
var droplst;


var randUser = function(){$.ajax({
        url: 'https://randomuser.me/api/',
        success: function(data){
            getUser(data)
            getNat
            droplst
        }
    });
    getUser= function(data) {
        console.log(data);
        //
        const info = data.results[0];
        let userFirstName = info.name.first;
        let userLastname = info.name.last;
        let photoID =info.picture.large;
        nat = info.nat;
        $('body').append(`
        <h2> Name: ${userFirstName} <br /> Last Name: ${userLastname} <br /></h2>
        <img src= ${photoID}> <br /> <h2> ${nat}</h2>
        `)
        //Location info
            let loc = info.location;
            console.log(loc)
            let state = loc.state;
            console.log(state);
            let city = loc.city;
            console.log(city);
            let street = loc.street;
            console.log(street);
            let postcode = loc.postcode
            console.log(postcode);
            $('body').append(`<h2> Address: ${street}, ${city}, ${state}, ${postcode} </h3>`);
            //contact info
            let biznum = info.phone;
            let cell = info.cell;
            let email = info.email;
            $('body').append(`<h2> ${biznum}, ${cell} ${email}</h2>`)
    }
    getNat = $.ajax({
        url: 'https://restcountries.eu/rest/v2/',
        success: function(data){
            console.log(data);
            for (var i =0; i<data.length; i++){
                let info = data[i];
                if(info.alpha2Code == nat){
                    let flag = info.flag
                $('body').append(`<img src=${flag} alt= "flag image">`)
                }
            }
        }
    })
    droplst = $.ajax({
        url: 'https://restcountries.eu/rest/v2/',
        success: function(data){
            $('body').append('<ul></ul>');
            for (var  i = 0; i<data.length; i++){
                let info = data[i];
                $('ul').append(`<li><button onclick = ''>${info.alpha2Code}</button></li>`);
            }
        }
    })
}

function onSignIn(googleUser) {
    console.log('User signed in!');
    var profile = googleUser.getBasicProfile();
    //change userName text, img source, & email text based on profile
    $(".userName").text(profile.getName());
    $("img").attr("src", profile.getImageUrl());
    $(".email").text(profile.getEmail());
    randUser;
}

//called when "sign out" button clicked
function onSignOut() {
    //should sign user out and toggleHidden
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.')
        //setting back to default
        $(".userName").text("USER_NAME");
        $("img").attr("src", "assets/placeholder.png");
        $(".email").text("example@example.com");
    });
}