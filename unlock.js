function unlockMaps(score){

    let progress =
    loadProgress();

    if(score >= 300){

        if(!progress.unlocked.includes("maze")){

            progress.unlocked.push("maze");

        }

    }

    if(score >= 600){

        if(!progress.unlocked.includes("melting")){

            progress.unlocked.push("melting");

        }

    }

    if(score >= 900){

        if(!progress.unlocked.includes("freak")){

            progress.unlocked.push("freak");

        }

    }

    saveProgress(progress);

}