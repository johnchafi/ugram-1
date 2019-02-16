import PictureItemHome from "../components/Picture/PictureItemHome";

class Helper {
    static getElapsedTime(date) : string {
        let today : Date = new Date();
        let diffMs : number = (date.getTime() - today.getTime());
        let diffDays : number = Math.round(Math.abs((date.getTime() - today.getTime())/(24*60*60*1000)));

        if (diffDays < 1) {
            let hours : number = Math.round(Math.abs(today.getTime() - date.getTime()) / 36e5);
            if (hours < 1) {
                let diffMins : number = Math.abs(Math.round(((diffMs % 86400000) % 3600000) / 60000));
                if (diffMins < 2)
                    return diffMins + " minute";
                return diffMins + " minutes";
            }
            else if (hours < 2)
                return hours + " heure";
            else
                return hours + " heures";
        }
        else {
            if (diffDays < 2)
                return diffDays + " jour";
            return diffDays + " jours";
        }
    }
}

export default Helper;