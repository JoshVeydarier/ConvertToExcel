const lest = require('./jsontodiv')
const XLSX = require('xlsx')
const calendar = [{
         "CodeUE": "HAI601",
         "NomUE": "Maths",
         "CM": 57,
         "TD": 78687,
         "TP": 87,
         "Effectif": 128,
         "Groupes": 4
     },
     {
         "CodeUE": "HAI607",
         "NomUE": "Physique",
         "CM": 42,
         "TD": 78,
         "TP": 789,
         "Effectif": 56,
         "Groupes": 3
     },
     {
         "CodeUE": "HAI608",
         "NomUE": "Programmation",
         "CM": 987418,
         "TD": 57,
         "TP": 543,
         "Effectif": 125,
         "Groupes": 4
     }
]

dict = {0: {1:'Hai606'}, 1:{2:'hai607'}, 2:{3: 'hai608'}}

 nomUE = lest.recupJSON();

var keys = Object.keys(dict);
keys.forEach(function(key){
    console.log(key, dict[key]);
});


const convertJsonToExcel = () => {

    const workSheet = XLSX.utils.json_to_sheet(calendar);
    const workBook = XLSX.utils.book_new();
    for (var key in calendar){
    for (i = 0; i< key; i++){
    //XLSX.utils.book_append_sheet(workBook, workSheet, dict[key][1] || dict [key][2] || dict [key][3])
     XLSX.utils.book_append_sheet(workBook, workSheet, dict[key][2])
     //XLSX.utils.book_append_sheet(workBook, workSheet, dict[key][3])
    }
    }


    // Generate buffer
    XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

    // Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

    XLSX.writeFile(workBook, "calendar.xlsx")
    
 

}

convertJsonToExcel()


            
