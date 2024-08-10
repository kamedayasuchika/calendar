var hour;
var seconds;

function create_h(){
    var all_h = [];
    for(h = 0; h < 24; h++){
        let time_h = document.getElementById("time_h");
        if(h < 10){
            hour = "0" + h;
            all_h.push(hour);
        }else{
            hour = String(h);
            all_h.push(hour);
        }
        let option = document.createElement("option");
        option.text = all_h[h];
        time_h.appendChild(option); 
    }
}

function create_s(){
    var all_s = [];
    for(s = 0; s < 60; s++){
        let time_s = document.getElementById("time_s");
        if(s < 10){
            seconds = "0" + s;
            all_s.push(seconds);
        }else{
            seconds = String(s);
            all_s.push(seconds);
        }
        let option = document.createElement("option");
        option.text = all_s[s];
        time_s.appendChild(option); 
    }
}

function submit(){
    let plan = document.getElementById("plan").value;
    let place = document.getElementById("place").value;
    let time_h = document.getElementById("time_h").value;
    let time_s = document.getElementById("time_s").value;

    localStorage.setItem("plan",plan);
    localStorage.setItem("place",place);
    localStorage.setItem("time_h",time_h);
    localStorage.setItem("time_s",time_s);

    window.location.href = "http://127.0.0.1:5500/index.html";
}