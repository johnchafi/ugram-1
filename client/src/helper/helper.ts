class Helper {
    static getElapsedTime(date) : string {
        let today : Date = new Date();
        let diffMs : number = (date.getTime() - today.getTime());
        let diffDays : number = Math.round(Math.abs((date.getTime() - today.getTime())/(24*60*60*1000)));

        if (diffDays < 1) {
            let hours : number = Math.round(Math.abs(today.getTime() - date.getTime()) / 36e5);
            if (hours < 1) {
                let diffMins : number = Math.abs(Math.round(((diffMs % 86400000) % 3600000) / 60000));
                if (diffMins < 2) {
                    return diffMins + " minute";
                }
                return diffMins + " minutes";
            }
            else if (hours < 2) {
                return hours + " heure";
            }
            else {
                return hours + " heures";
            }
        }
        else {
            if (diffDays < 2) {
                return diffDays + " jour";
            }
            return diffDays + " jours";
        }
    }

    static getPrettyDate(registerDate) : string {
        let date : Date = new Date(Number(registerDate));

        let monthNames : string[] = [
            "Janvier", "Fevrier", "Mars",
            "Avril", "Mai", "Juin", "Juillet",
            "Aout", "Septembre", "Octobre",
            "Novembre", "Decembre"
        ];

        return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
    }
    static dataURLtoFile(dataurl, filename) : File {
        var arr = dataurl.split(","), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
}

export default Helper;
