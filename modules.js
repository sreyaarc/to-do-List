function getGeneralDate() {
    let today = new Date();
    let options = {
        day : "numeric",
        month: "long",
        year: "numeric"
    };
    return today.toLocaleDateString("en-US", options);
}

function typeOfDay() {
    let today = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}`;
}

function currentDay() {
    let today = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${days[today.getDay()]}`;
}

export {getGeneralDate, typeOfDay, currentDay};
