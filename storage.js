function saveProgress(data){

    localStorage.setItem(
        "snake_progress",
        JSON.stringify(data)
    );

}

function loadProgress(){

    let data =
    localStorage.getItem(
        "snake_progress"
    );

    if(data){

        return JSON.parse(data);

    }

    return{
        unlocked:[
            "classic",
            "squares",
            "outer"
        ]
    };
}
