//今日の日付
let today = new Date();

var year;
var month;

//曜日
const week = ["日","月","火","水","木","金","土"];
const todo = ["予定","場所","日付","時間"];
const displaylist = [];

var plan;
var place;
var time_h;
var time_s;
var All_Data;

//画面が読み込まれた際に、カレンダーを表示
window.onload = function(){
    Calendarheader(today);
    CalendarTable();
    dayclick();
    // display();
     // ローカルストレージから保存されたタスクを取得し、存在しなければ空の配列を作成
     const saveTasks = JSON.parse(localStorage.getItem("tasks")) || [];
     console.log(saveTasks);
    //  All_Data = 
    //   "予定:　" + displaylist[0] + "　" +
    //   "場所:　" + displaylist[1] + "　" +
    //   "日付:　" + displaylist[2] + "　" +
    //   "時間:　" + displaylist[3];
    // 保存された各タスクに対して処理を行う
    saveTasks.forEach(function (taskText) {
        // タスクを表示する関数を呼び出す
        createTask(taskText);
      });
     };

//  // タスクを追加するボタンがクリックされたときの処理
//  document.getElementById("add-task").addEventListener("click", function () {
//     // ユーザーが入力したタスクのテキストを取得
//     const taskText = All_Data;
//     console.log(All_Data);
//     // 入力が空でない場合
//     if (taskText) {
//       // タスクを表示する関数を呼び出す
//     //   createTask(taskText);
//       // タスクを保存する関数を呼び出す
//       saveTask(taskText);
//       // 入力フィールドをクリア
//       All_Data = "";
//     }
//   });

// タスクを表示する関数
function createTask(taskText) {
    // タスクリストの要素を取得
    const taskList = document.getElementById("task-list");
    // 新しいタスクアイテム（li要素）を作成
    const taskItem = document.createElement("li");
    // タスクアイテムにテキストを設定
    taskItem.textContent = taskText;
  
    // 削除ボタンを作成
    const deleteButton = document.createElement("button");
    // 削除ボタンのテキストを設定
    deleteButton.textContent = "削除";
    // 削除ボタンがクリックされたときの処理を設定
    deleteButton.addEventListener("click", function () {
      // タスクを削除する関数を呼び出す
      deleteTask(taskText);
      // タスクアイテムをタスクリストから削除
      taskList.removeChild(taskItem);
    });
  
    // 削除ボタンをタスクアイテムに追加
    taskItem.appendChild(deleteButton);
    // タスクアイテムをタスクリストに追加
    taskList.appendChild(taskItem);
  }
 
  // タスクをローカルストレージに保存する関数
  function saveTask(taskText) {
    // ローカルストレージから保存されたタスクを取得し、存在しなければ空の配列を作成
    const saveTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(saveTasks);
    // 新しいタスクを保存されたタスクリストに追加
    saveTasks.push(taskText);
    // タスクリストをローカルストレージに保存
    localStorage.setItem("tasks", JSON.stringify(saveTasks));
  }

    // タスクを削除する関数
    function deleteTask(taskText) {
        // ローカルストレージから保存されたタスクを取得し、存在しなければ空の配列を作成
        const saveTasks = JSON.parse(localStorage.getItem("tasks"))|| [];
        console.log(saveTasks);

        // 指定されたタスクをフィルタリングして削除
        const updatedTasks = saveTasks.filter(function (task) {
          return task !== taskText;
        });
        // 更新されたタスクリストをローカルストレージに保存
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }


    //   function display(){
    //     let all_data = JSON.parse(localStorage.getItem("All_Data"));
    
    //     var getplan = all_data.plan;
    //     displaylist.push(getplan);
    
    //     var getplace = all_data.place;
    //     displaylist.push(getplace);
    
    //     var getdate = all_data.day;
    //     displaylist.push(getdate);
    
    //     var gettime_h = all_data.time_h;
    //     var gettime_s = all_data.time_s;
    //     var gettime_all = gettime_h + ":" + gettime_s;
    //     displaylist.push(gettime_all);
    //     console.log(displaylist);
    //   }
    
        // localStorage.setItem("All_Data",JSON.stringify(all_data));
    
        // getdate = String(getdate).slice(0 , -3);
    
        // if(year_month == getdate){
        //     const text_area = document.getElementById("text_area");
        //     var table = document.createElement("table");
        //     table.id = "plantable";
        //     var tr = document.createElement("tr");
        //     tr.id = "plantable_tr";
        //     for(i = 0; i < todo.length; i++){
        //         var td = document.createElement("td");
        //         td.id = "plantable_td";
        //         var td_text = document.createTextNode(todo[i]);
        //         td.appendChild(td_text);
        //         tr.appendChild(td);
        //     }
            
        //     var tr1 = document.createElement("tr");
        //     for(i = 0; i < todo.length; i++){
        //         var td1 = document.createElement("td");
        //         var td_text1 = document.createTextNode(displaylist[i]);
        //         td1.appendChild(td_text1);
        //         tr1.appendChild(td1);
        //     }
        //         table.appendChild(tr);
        //         table.appendChild(tr1);
        //         text_area.appendChild(table);
        //     }
        // }

//カレンダーの～年～月の部分を作成
function Calendarheader(today){
    year = today.getFullYear();
    month = today.getMonth() + 1;
    if(month < 10){
        month = "0" + month;
    }
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


    year = today.getFullYear();
    month = today.getMonth();
    
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
}

var year_month;

function dayclick(){
    if((month + 1) < 10){
        month = "0" + (month + 1);
        year_month = String(year) + "-" + month; 
        console.log(year_month);  
    }else{
        year_month = String(year) + "-" + (month + 1);   
        console.log(year_month);
    }

}

var hour;
var seconds;
const list = [];
const storage = localStorage;


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
    let day = document.getElementById("day").value;
    let time_h = document.getElementById("time_h").value;
    let time_s = document.getElementById("time_s").value;
    var taskText =  
      "予定:　" + plan + "　" +
      "場所:　" + place + "　" +
      "日付:　" + day + "　" +
      "時間:　" + time_h + ":" + time_s;

    if(taskText) {
        // タスクを表示する関数を呼び出す
        createTask(taskText);
        // タスクを保存する関数を呼び出す
        saveTask(taskText);
        // 入力フィールドをクリア
        document.getElementById("plan").value = "";
        document.getElementById("place").value= "";
        document.getElementById("day").value= "";
        document.getElementById("time_h").value= "";
        document.getElementById("time_s").value= "";
      }
}

function button_remove(){ 
    localStorage.removeItem('All_Data');
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

