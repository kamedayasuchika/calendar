let today = new Date();

const week = ["日","月","火","水","木","金","土"];

window.onload = function(){
    Calendarheader(today);
    CalendarTable();
}

function Calendarheader(today){
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var header = year + "年" + month + "月";
    document.getElementById("Header_year_month").textContent = header;
}

function CalendarTable(){
    const table = document.createElement("table");
    table.id = "calendartable";
    const thead = document.createElement("thead");
    const thead_tr = document.createElement("tr");
    for(let i = 0; i < week.length; i++){
        const thead_th = document.createElement("th");
        const textweek = document.createTextNode(week[i]);
        thead_th.appendChild(textweek);
        thead_tr.appendChild(thead_th);
    }
    thead.appendChild(thead_tr);
    table.appendChild(thead);

    var year = today.getFullYear();
    var month = today.getMonth();
    console.log(month);
    var startDayOfWeek = new Date(year, month, 1).getDay();
    var monthOfEndDay = new Date(year, month + 1, 0).getDate();
    var countDay = 0;
    var countjoin = 0;

    const tbody = document.createElement("tbody");
    tbody.id = "calendartbody";
    for(let t = 0; t < 6; t++){
        const tbody_tr = document.createElement("tr");
        for(let j = 0; j < week.length; j++){
            if(t == 0 && startDayOfWeek == j){
                const tbody_th = document.createElement("th");
                countDay++;
                const textday = document.createTextNode(countDay);
                tbody_th.appendChild(textday);
                tbody_tr.appendChild(tbody_th);
            }else if(countDay != 0 && countDay < monthOfEndDay && t < 5){
                const tbody_th = document.createElement("th");
                countDay++;
                const textday = document.createTextNode(countDay);
                tbody_th.appendChild(textday);
                tbody_tr.appendChild(tbody_th);
            }else if(t == 5 && countDay < monthOfEndDay){
                countDay++;
                var joinweek = document.getElementById("calendartbody");  
                var x = joinweek.rows[4];
                var joinday = x.cells[countjoin];
                joinday.firstChild.nodeValue = x.cells[countjoin].textContent + "/" + countDay;
                countjoin++;
            }else if(t < 5){
                const tbody_td = document.createElement("th");
                const textday = document.createTextNode("");
                tbody_td.appendChild(textday);
                tbody_tr.appendChild(tbody_td);
            }
            tbody.appendChild(tbody_tr);
        }
        table.appendChild(tbody);
        const calender = document.getElementById("calendar");
        calender.appendChild(table); 
    }
}

function removeCalendar(){
    var calendartable = document.getElementById("calendar");
    while(calendartable.firstChild){
        calendartable.removeChild(calendartable.firstChild);
    }  
    CalendarTable();
}

function last_year(){
    today.setFullYear(today.getFullYear() - 1);
    removeCalendar();
    Calendarheader(today);
}

function next_year(){
    today.setFullYear(today.getFullYear() + 1);
    removeCalendar();
    Calendarheader(today);
}

function last_month(){
    today.setMonth(today.getMonth() - 1);
    removeCalendar();
    Calendarheader(today); 
}

function next_month(){
    today.setMonth(today.getMonth() + 1);
    removeCalendar();
    Calendarheader(today);
}

function reset_year_month(){
    today = new Date();
    removeCalendar();
    Calendarheader(today);
}