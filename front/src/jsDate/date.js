

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]


export const dateForNote = new Date()

export const today = dateForNote.getDate();

export const month = monthNames[dateForNote.getMonth()]

let dateForCalendar = new Date();
let dd = String(dateForCalendar.getDate()).padStart(2, '0');
let mm = String(dateForCalendar.getMonth() + 1).padStart(2, '0');
let yyyy = dateForCalendar.getFullYear();

dateForCalendar = yyyy + '-' + mm + '-' + dd;

export const calendarDate = dateForCalendar