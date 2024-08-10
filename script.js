//今日の日付
let today = new Date();

//曜日
const week = ["日","月","火","水","木","金","土"];

var plan;
var place;
var time_h;
var time_s;

//画面が読み込まれた際に、カレンダーを表示
window.onload = function(){
    Calendarheader(today);
    CalendarTable();
    save();
}
    


//カレンダーの～年～月の部分を作成
function Calendarheader(today){
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var header = year + "年" + month + "月";
    document.getElementById("Header_year_month").textContent = header;
}

//カレンダーの日付の部分を作成
function CalendarTable(){
    const table = document.createElement("table");
    table.id = "calendartable";
    const thead = document.createElement("thead");
    const thead_tr = document.createElement("tr");
    for(let i = 0; i < week.length; i++){  //曜日の作成
        const thead_th = document.createElement("th");
        const textweek = document.createTextNode(week[i]);
        thead_th.appendChild(textweek);
        thead_tr.appendChild(thead_th);
    }
    thead.appendChild(thead_tr);
    table.appendChild(thead);


    var year = today.getFullYear();
    var month = today.getMonth();
    
    var startDayOfWeek = new Date(year, month, 1).getDay(); //月初の曜日を取得
    var monthOfEndDay = new Date(year, month + 1, 0).getDate(); //月末日を取得

    var countDay = 0; //日にち
    const plus_seven = 7; //7日
    var countDay_plus_seven; //日にち+7日
    
    var lastWeek = 4; //最終週
    var textday; //　td内に表示されるテキスト
    

    const tbody = document.createElement("tbody");
    tbody.id = "calendartbody";
    for(let t = 0; t < 5; t++){
        const tbody_tr = document.createElement("tr");
        for(let j = 0; j < week.length; j++){
            const tbody_td = document.createElement("td");
            tbody_td.classList.add("in_data");
            if((t == 0 && j < startDayOfWeek) || (t == 4  && countDay == monthOfEndDay)){ //月初前、月末後に空白の枠作成
                tbody_td.classList.replace("in_data","no_data");
                textday = document.createTextNode("　");
            }else if(t == 0 && startDayOfWeek == j){  //1週目の作成
                countDay++;
                textday = document.createTextNode(countDay); 
            }else if(t < lastWeek){  //2~4週目の作成
                countDay++;
                textday = document.createTextNode(countDay);
            }else if(t == lastWeek && startDayOfWeek >= 5 && monthOfEndDay == "31" && countDay_plus_seven < monthOfEndDay){  //最終週で、月初が金、土で始まり、月末が31日、日付+7日が月末未満
                countDay++;
                textday = document.createTextNode(countDay + "/" + (countDay_plus_seven + 1));
            }else if(t == lastWeek && startDayOfWeek == 6 && monthOfEndDay == "30" && countDay_plus_seven <= monthOfEndDay){ //最終週で、月初が土で始まり、月末が30日、日付+7日が月末未満
                countDay++;
                textday = document.createTextNode(countDay + "/" + countDay_plus_seven);
            }else if(t == lastWeek){ //最終週で、上2つ以外の場合
                countDay++;
                textday = document.createTextNode(countDay);
            }
            tbody_td.appendChild(textday);
            tbody_tr.appendChild(tbody_td);
            tbody.appendChild(tbody_tr);
            countDay_plus_seven = countDay + plus_seven;
        }
        table.appendChild(tbody);
        const calender = document.getElementById("calendar");
        calender.appendChild(table); 
    }
    var allTd = document.querySelectorAll(".in_data");
    addclick(allTd);
}

function addclick(allTd){
    const div = document.getElementById("text_area");
    for(var td of allTd){
        td.addEventListener('click',function(){
            removetext();
            
            const button_create = document.createElement("input");
            button_create.id = "button_create";
            button_create.type = "button";
            button_create.value = "予定の作成";
            div.appendChild(button_create);
            create(button_create);
           
            const button_display = document.createElement("input");
            button_display.type = "button";
            button_display.value = "予定の表示";
            div.appendChild(button_display);
            display(button_display);
        },false); 
    }  
}

function create(button_create){
    button_create.addEventListener("click",function(){
        window.location.href = "http://127.0.0.1:5500/plan.html";
})
}

function save(){
        plan = localStorage.getItem("plan");
        place = localStorage.getItem("place");
        time_h = localStorage.getItem("time_h");
        time_s = localStorage.getItem("time_s");

        console.log(plan);
        console.log(place);
        console.log(time_h);
        console.log(time_s);
}

function display(button_display){
    button_display.addEventListener("click",function(){
        const div = document.getElementById("text_area");
        const Unordered_List = document.createElement("ul");
        for(l = 0; l < 3; l++){
            const List_item = document.createElement("li");
            switch(l){
                case 0:
                    textnode = document.createTextNode(plan);
                    break;

                case 1:
                    textnode = document.createTextNode(place);
                    break;

                case 2:
                    textnode = document.createTextNode(time_h + ":" + time_s);
                    break;
                }
            List_item.appendChild(textnode);
            Unordered_List.appendChild(List_item);
        }
        div.appendChild(Unordered_List);
    })
}

function removetext(){
    const div = document.getElementById("text_area");
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}


//年、月のボタンが押されるたびに表示されているカレンダーを削除し、変更後の年、月で再度カレンダーを作成
function removeCalendar(){
    var calendartable = document.getElementById("calendar");
    while(calendartable.firstChild){
        calendartable.removeChild(calendartable.firstChild);
    }  
    CalendarTable();
}

//去年
function last_year(){
    today.setFullYear(today.getFullYear() - 1);
    removeCalendar();
    Calendarheader(today);
}

//来年
function next_year(){
    today.setFullYear(today.getFullYear() + 1);
    removeCalendar();
    Calendarheader(today);
}

//先月
function last_month(){
    today.setMonth(today.getMonth() - 1);
    removeCalendar();
    Calendarheader(today); 
}

//来月
function next_month(){
    today.setMonth(today.getMonth() + 1,1);
    removeCalendar();
    Calendarheader(today);
}

//今日の日付
function reset_year_month(){
    today = new Date();
    removeCalendar();
    Calendarheader(today);
}

